import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageConfigService } from './storage-config.service';
import { ConfigModule } from '@nestjs-library/config';

@Module({
  imports: [ConfigModule.forFeature(StorageConfigService)],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
