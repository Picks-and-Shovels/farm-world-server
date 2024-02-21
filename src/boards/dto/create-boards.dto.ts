import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsNumber } from "class-validator";

export class CreateBoardsDto{

  @ApiProperty({
    description : '제목',
    example : '당근 씨앗 얼마예요?'
  })
  @IsString()
  @IsNotEmpty()
  title : string;

  @ApiProperty({
    description : '내용',
    example : "1000원정도 하나요?"
  })
  @IsString()
  @IsNotEmpty()
  content : string;

}