import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

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
}
