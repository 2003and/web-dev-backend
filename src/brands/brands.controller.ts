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

import { BrandService } from './brands.service';
import { fileStorage } from './storage';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateBrandDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<BrandEntity> {
    return this.brandService.create(dto, image);
  }

  @Get()
  findAll(): Promise<BrandEntity[]> {
    return this.brandService.findAll();
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/promo' });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BrandEntity> {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<BrandEntity> {
    return this.brandService.update(+id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.brandService.delete(+id);
  }
}
