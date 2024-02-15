/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePromoDto {
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
  @IsString()
  title: string = 'Название акции';

  @ApiProperty()
  @IsString()
  text: string = 'Описание акции';

  @ApiProperty()
  @IsNumber()
  rating: number = 5;

  @ApiProperty()
  @IsNumber()
  price: number = 10000;
}
