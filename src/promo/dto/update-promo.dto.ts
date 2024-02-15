import { PartialType } from '@nestjs/mapped-types';
import { CreatePromoDto } from './create-promo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
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

  @IsString()
  title: string;

  @IsString()
  text: string;
}
