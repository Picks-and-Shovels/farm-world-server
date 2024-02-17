import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Journal])],
  providers: [JournalService],
  controllers: [JournalController]
})
export class JournalModule {}
