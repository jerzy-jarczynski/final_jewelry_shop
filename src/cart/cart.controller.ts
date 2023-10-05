import { Controller, Get, UseGuards, Request, Body, Post, Delete, Param, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUserCart(@Request() req) {
    const userId = req.user.id;
    return this.cartService.getUserCart(userId);
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addCartItem(@Request() req, @Body() createCartItemDto: CreateCartItemDto) {
    const userId = req.user.id;
    return this.cartService.addCartItem(userId, createCartItemDto);
  }

  @Delete('/:cartItemId')
  @UseGuards(JwtAuthGuard)
  async deleteCartItem(@Param('cartItemId') cartItemId: string) {
    return this.cartService.deleteCartItem(cartItemId);
  }

  @Put('/:cartItemId')
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
      @Param('cartItemId') cartItemId: string,
      @Body() updateData: CreateCartItemDto
  ) {
      return this.cartService.updateCartItem(cartItemId, updateData);
  }  
}
