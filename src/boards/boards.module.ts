import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
import { boardReadLike } from './entities/boardReadLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board,boardReadLike])],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
