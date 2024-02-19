import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';
import { Repository } from 'typeorm';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal) 
    private readonly journalRepository : Repository<Journal>
    ){}

    async postJournal(journalDate : Date | string,createJournalDto : CreateJournalDto){

      const date = journalDate instanceof Date ? journalDate : new Date(journalDate);

      const dateOnly = new Date(date.toISOString().split('T')[0]);

      const existingJournal = await this.journalRepository.findOne({
        where:{date :dateOnly},
      });

      if(existingJournal){
        throw new Error('Journal already exists for this date.');
      }

      const journal = await this.journalRepository.create({
        ...createJournalDto,
        date : dateOnly,
      });

      return await this.journalRepository.save(journal);
    }

    async getJournal(journalDate : Date | string){
      const date = journalDate instanceof Date ? journalDate : new Date(journalDate);

      const dateOnly = new Date(date.toISOString().split('T')[0]);
      
      const journal = await this.journalRepository.findOne({
        where : {date : dateOnly}
      })

      if(!journal){
        throw new Error('need to write Journal');
      }

      return journal;
    }

    async updateJournal(journalDate : Date|string ,updateJournalDto : UpdateJournalDto){
      const date = journalDate instanceof Date ? journalDate : new Date(journalDate);

      const dateOnly = new Date(date.toISOString().split('T')[0]);
      
      const journal = await this.journalRepository.findOne({
        where : {date : dateOnly}
      })

      this.journalRepository.merge(journal,updateJournalDto);

      return await this.journalRepository.save(journal);
    }

    async deleteJournal(journalDate : Date|string){
      const date = journalDate instanceof Date ? journalDate : new Date(journalDate);

      const dateOnly = new Date(date.toISOString().split('T')[0]);
      
      const journal = await this.journalRepository.findOne({
        where : {date : dateOnly}
      })

      if(journal){
        await this.journalRepository.remove(journal);
      }
    }
}
