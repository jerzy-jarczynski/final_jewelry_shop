import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderItemDTO } from './dtos/create-order-item.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post('/')
  create(@Body() createOrderDto: CreateOrderDTO) {
    return this.ordersService.create(createOrderDto);
  }
  
  @Put('/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDTO) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Post('/:orderId/items')
  createOrderItem(@Param('orderId') orderId: string, @Body() createOrderItemDto: CreateOrderItemDTO) {
    createOrderItemDto.orderId = orderId;
    return this.ordersService.createOrderItem(createOrderItemDto);
  }

  @Post('/proceed-order')
  createOrderFromCart(@Body() cart: any) {
      return this.ordersService.createOrderFromCart(cart);
  }  
}
