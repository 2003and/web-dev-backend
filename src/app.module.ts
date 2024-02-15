import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgres.config';
import { PromoModule } from './promo/promo.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brands/brands.module';
import { NewsModule } from './news/news.module';
import { IdeaModule } from './ideas/idea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    PromoModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    NewsModule,
    IdeaModule,
  ],
})
export class AppModule {}
