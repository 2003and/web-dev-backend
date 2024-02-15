import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CategoryEntity } from 'src/category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name = 'Тренажер';

  @ApiProperty()
  @IsString()
  description = 'Описание';

  @ApiProperty()
  @IsInt()
  amount = 10;

  @ApiProperty()
  @IsNumber()
  price = 10000;

  @ApiProperty()
  @IsString()
  category: CategoryEntity;
}
