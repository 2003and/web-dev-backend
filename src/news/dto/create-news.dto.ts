import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateNewsDto {
  // @ApiProperty({
  //   type: 'file',
  //   properties: {
  //     file: {
  //       type: 'string',
  //       format: 'binary',
  //     },
  //   },
  // })
  // image: Express.Multer.File;

  @ApiProperty()
  // @IsString()
  title: string;

  @ApiProperty()
  // @Type(() => String)
  // @IsString()
  description: string;
}
