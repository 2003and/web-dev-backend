import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    // return this.orderService.order(createOrderDto.userId);
    return this.orderService.order(req.user_id, dto.address);
  }

  // @Get()
  // findAll() {
  //   return this.orderService.getOrders();
  // }

  @Get(':id')
  findOne(@Req() req: any) {
    return this.orderService.getOrders(req.user_id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
