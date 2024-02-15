import { PartialType } from '@nestjs/mapped-types';
import { CreateIdeaDto } from './create-idea.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateIdeaDto extends PartialType(CreateIdeaDto) {
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
