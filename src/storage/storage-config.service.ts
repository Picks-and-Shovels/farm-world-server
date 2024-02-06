import { AbstractConfigService } from '@nestjs-library/config';
import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class StorageConfigService extends AbstractConfigService<StorageConfigService> {
  @Expose({ name: 'GCP_PROJECT_ID' })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @Expose({ name: 'GCP_CLIENT_EMAIL' })
  @IsString()
  @IsNotEmpty()
  clientEmail: string;

  @Expose({ name: 'GCP_PRIVATE_KEY' })
  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @Expose({ name: 'GCP_MEDIA_BUCKET' })
  @IsString()
  @IsNotEmpty()
  mediaBucket: string;
}
