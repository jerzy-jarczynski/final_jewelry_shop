import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderItemDTO } from './dtos/create-order-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const userId = (req.user as any).id;
    return this.ordersService.findAll(userId);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDTO) {
    return this.ordersService.create(createOrderDto);
  }
  
  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDTO) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Post('/:orderId/items')
  @UseGuards(JwtAuthGuard)
  createOrderItem(@Param('orderId') orderId: string, @Body() createOrderItemDto: CreateOrderItemDTO) {
    createOrderItemDto.orderId = orderId;
    return this.ordersService.createOrderItem(createOrderItemDto);
  }

  @Post('/proceed-order')
  @UseGuards(JwtAuthGuard)
  createOrderFromCart(@Body() cart: any) {
      return this.ordersService.createOrderFromCart(cart);
  }  
}
