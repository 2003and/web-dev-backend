import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { IdeaEntity } from './entities/idea.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private repository: Repository<IdeaEntity>,
  ) {}

  async create(
    dto: CreateIdeaDto,
    image: Express.Multer.File,
  ): Promise<IdeaEntity> {
    return this.repository.save({
      image: image.filename,
      title: dto.title,
    });
  }

  async findAll(): Promise<IdeaEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<IdeaEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateIdeaDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.title) {
      toUpdate.title = dto.title;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/ideas/${toUpdate.image}`, (err) => {
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
