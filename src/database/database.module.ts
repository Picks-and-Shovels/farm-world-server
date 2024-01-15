import { ConfigModule } from '@nestjs-library/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfigService } from './typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(TypeORMConfigService)],
      useFactory: (config: TypeORMConfigService) => config,
      inject: [TypeORMConfigService],
    }),
  ],
})
export class DatabaseModule {}
