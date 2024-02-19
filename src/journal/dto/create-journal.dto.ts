import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateJournalDto{
  @ApiProperty({
    description : '일지 제목',
    example : '2월 12일 한 일'
  })
  @IsString()
  @IsNotEmpty()
  title : string;

  @ApiProperty({
    description : '일지 내용',
    example : '왕감자 수확했다.'
  })
  @IsString()
  @IsNotEmpty()
  content : string;

  @IsDateString()
  date : Date

  @IsString()
  photoUrl? : string;
}