import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  itemId: number;

  @ApiProperty()
  quantity: number;
}
