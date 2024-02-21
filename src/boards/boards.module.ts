import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
import { boardReadLike } from './entities/boardReadLike.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board,boardReadLike,User])],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
