import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { IdeaEntity } from './entities/idea.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([IdeaEntity])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
