import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private repository: Repository<BrandEntity>,
  ) {}

  async create(
    dto: CreateBrandDto,
    image: Express.Multer.File,
  ): Promise<BrandEntity> {
    return this.repository.save({
      image: image.filename,
      name: dto.name,
    });
  }

  async findAll(): Promise<BrandEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<BrandEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateBrandDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/promo/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
