import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';

@Controller('media')
export class MediaController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  async uploadMedia(@UploadedFiles() files: Array<Express.Multer.File>) {
    await Promise.all(
      files.map((file) => this.storageService.save('media', file)),
    );
  }
}
