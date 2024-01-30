import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';
import { Board } from 'src/boards/entities/boards.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Comment,Board])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
