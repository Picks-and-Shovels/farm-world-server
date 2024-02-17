import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { JournalService } from './journal.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';

@ApiTags('일지 작성 API')
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService : JournalService){}

  @ApiOperation({summary :'일지 생성 API',description : '일지 생성'})
  @ApiParam({name : 'date',description :'일지 작성 일자',example :'2024-02-12',required : true})
  @Post(':date')
  postJournal(
    @Param('date') journalDate : Date,
    @Body() createJournalDto : CreateJournalDto,
  ){
    return this.journalService.postJournal(journalDate,createJournalDto);
  }

  @ApiOperation({summary : '일지 조회 API',description: '일지 조회'})
  @ApiParam({name : 'date',description :'일지 작성 일자',example :'2024-02-12',required : true})
  @Get(':date')
  getJournal(@Param('date') journalDate : Date){
    return this.journalService.getJournal(journalDate);
  }

  @ApiOperation({summary :'일지 수정 API',description : '일지 수정'})
  @ApiParam({name : 'date',description :'일지 작성 일자',example :'2024-02-12',required : true})
  @Patch(':date')
  updateJournal(
    @Param('date') journalDate : Date,
    @Body() updateJournalDto : UpdateJournalDto,   
   ){
    return this.journalService.updateJournal(journalDate,updateJournalDto);
  }

  @ApiOperation({summary :'일지 삭제 API',description : '일지 삭제'})
  @ApiParam({name : 'date',description :'일지 작성 일자',example :'2024-02-12',required : true})
  @Delete(':date')
  deleteJournal(
    @Param('date') journalDate : Date,
  ){
    return this.journalService.deleteJournal(journalDate);
  }
}
