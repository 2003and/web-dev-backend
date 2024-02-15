import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { IdeaService } from './idea.service';
import { fileStorage } from './storage';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { IdeaEntity } from './entities/idea.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('idea')
@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateIdeaDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IdeaEntity> {
    return this.ideaService.create(dto, image);
  }

  @Get()
  findAll(): Promise<IdeaEntity[]> {
    return this.ideaService.findAll();
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/ideas' });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IdeaEntity> {
    return this.ideaService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIdeaDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IdeaEntity> {
    return this.ideaService.update(+id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.ideaService.delete(+id);
  }
}
