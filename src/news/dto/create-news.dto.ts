import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateNewsDto {
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
  @Type(() => String)
  title: string;

  @ApiProperty()
  @Type(() => String)
  description: string;
}
