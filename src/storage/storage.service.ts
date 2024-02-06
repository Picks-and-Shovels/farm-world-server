import { Injectable } from '@nestjs/common';
import { StorageConfigService } from './storage-config.service';
import { Bucket, Storage } from '@google-cloud/storage';
import { ConfigMetadata } from '@google-cloud/storage/build/cjs/src/resumable-upload';
import _path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor(private readonly storageConfigService: StorageConfigService) {
    console.log(storageConfigService);
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

  getContentType(file: Express.Multer.File) {
    return typeof file.mimetype === 'string' ? file.mimetype : undefined;
  }

  getFilename(file: Express.Multer.File) {
    return typeof file.originalname === 'string' ? file.originalname : uuid();
  }

  async save(
    destination: string,
    file: Express.Multer.File,
    metadata: ConfigMetadata = {},
  ) {
    const filename = this.getFilename(file);
    const path = _path.join(destination, filename);

    const _file = this.bucket.file(path);

    const contentType = this.getContentType(file);
    if (contentType) metadata.contentType = contentType;

    return new Promise((res, rej) => {
      _file
        .createWriteStream({ metadata })
        .on('error', (err) => rej(err))
        .on('finish', () =>
          res(
            `https://storage.googleapis.com/${_file.metadata.bucket}/${path}`,
          ),
        )
        .end(file.buffer);
    });
  }

  async delete(path: string) {
    await this.bucket.file(path).delete({ ignoreNotFound: true });
  }
}
