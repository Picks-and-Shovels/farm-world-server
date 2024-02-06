import { Injectable } from '@nestjs/common';
import { StorageConfigService } from './storage-config.service';
import { Bucket, Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor(private readonly storageConfigService: StorageConfigService) {
    const { projectId, clientEmail, privateKey, mediaBucket } =
      storageConfigService;

    this.storage = new Storage({
      projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    this.bucket = this.storage.bucket(mediaBucket);
  }

  async save(
    path: string,
    file: Express.Multer.File,
    metadata: Record<string, string>[],
  ) {}
}
