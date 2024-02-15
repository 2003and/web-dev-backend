import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BrandService } from './brands.service';
import { BrandController } from './brands.controller';
import { BrandEntity } from './entities/brand.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
