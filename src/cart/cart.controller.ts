import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('cart')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  // @ApiConsumes('multipart/form-data')
  async create(@Body() dto: CreateCartDto, @Req() req: any) {
    return this.cartService.create(dto, req.user_id);
  }

  // @Get()
  // async findAll() {
  //   return this.cartService.findAll();
  // }
  @Get()
  get(@Req() req: any) {
    return this.cartService.get(req.user.id);
  }
  // @Get(':id')
  // @ApiConsumes('multipart/form-data')
  // async findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiConsumes('multipart/form-data')
  // async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // @ApiConsumes('multipart/form-data')
  // async remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
