import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('cart')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() dto: CreateCartDto, @Req() req: any) {
    return this.cartService.create(dto, req.user_id);
  }

  @Get()
  get(@Req() req: any) {
    return this.cartService.get(req.user.id);
  }
}
