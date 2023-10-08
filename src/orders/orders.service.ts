import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Order, OrderItem } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderItemDTO } from './dtos/create-order-item.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId?: string): Promise<Order[]> {
    if (userId) {
      return this.prismaService.order.findMany({
        where: {
          userId: userId,
        },
        include: {
          orderItems: true,
        },
      });
    } else {
      return this.prismaService.order.findMany({
        include: {
          orderItems: true,
        },
      });
    }
  }
  
  async findOne(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderItems: true
      }
    });
  }

  async create(data: CreateOrderDTO): Promise<Order> {
    const orderInput: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: data.userId
        }
      },
      date: new Date(data.date),
      priceSum: data.priceSum,
      comment: data.comment,
      clientName: data.clientName,
      email: data.email,
      address: data.address
    };
    
    return this.prismaService.order.create({ data: orderInput });
  }

  async update(id: string, data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.prismaService.order.delete({ where: { id } });
    return { message: 'Order and its items successfully deleted.' };
  }

  async createOrderItem(data: CreateOrderItemDTO): Promise<OrderItem> {
    const orderItemInput: Prisma.OrderItemCreateInput = {
      order: {
        connect: {
          id: data.orderId
        }
      },
      product: {
        connect: {
          id: data.productId
        }
      },
      amount: data.amount,
      color: data.color,
      size: data.size,
      comment: data.comment
    };
    
    return this.prismaService.orderItem.create({ data: orderItemInput });
  }

  async createOrderFromCart(cart: any): Promise<Order> {
    let totalSum = 0;

    for (const item of cart.cartItems) {
      const product = await this.prismaService.product.findUnique({ 
        where: { id: item.productId }
      });
      if (product) {
        const priceAsFloat = parseFloat(product.price.toString());
        if (!isNaN(priceAsFloat)) {
          totalSum += item.amount * priceAsFloat;
        }
      }
    }

    const orderInput: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: cart.userId
        }
      },
      date: new Date(),
      priceSum: totalSum,
      comment: cart.comment,
      clientName: cart.clientName,
      email: cart.email,
      address: cart.address,
    };

    const newOrder = await this.prismaService.order.create({ data: orderInput });

    for (const cartItem of cart.cartItems) {
      const orderItemInput: Prisma.OrderItemCreateInput = {
        order: {
          connect: {
            id: newOrder.id
          }
        },
        product: {
          connect: {
            id: cartItem.productId
          }
        },
        amount: cartItem.amount,
        color: cartItem.color,
        size: cartItem.size,
        comment: cartItem.comment,
      };

      await this.prismaService.orderItem.create({ data: orderItemInput });
    }

    return newOrder;
  }
}
