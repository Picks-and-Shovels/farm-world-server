import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [DatabaseModule, UserModule, FarmModule, BoardsModule, CommentsModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
