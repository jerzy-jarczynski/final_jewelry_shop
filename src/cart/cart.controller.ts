import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
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
}
