import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserCart(userId: string) {
    return this.prismaService.cart.findUnique({
      where: { userId },
      include: { cartItems: true }
    });
  }

  public async addCartItem(userId: string, createCartItemDto: CreateCartItemDto) {
    const userCart = await this.prismaService.cart.findUnique({
      where: { userId }
    });

    if (!userCart) {
      throw new Error("User doesn't have a cart");
    }

    return this.prismaService.cartItem.create({
      data: {
        cartId: userCart.id,
        productId: createCartItemDto.productId,
        amount: createCartItemDto.amount,
        color: createCartItemDto.color,
        size: createCartItemDto.size,
        comment: createCartItemDto.comment
      }
    });
  }

  public async deleteCartItem(cartItemId: string) {
    return this.prismaService.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  public async updateCartItem(cartItemId: string, updateData: CreateCartItemDto) {
    return this.prismaService.cartItem.update({
      where: {
        id: cartItemId
      },
      data: updateData
    });
  }
}
