import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateDateColumn,UpdateDateColumn } from "typeorm";
export class CreateCommentDto{

  @ApiProperty({
    description : '내용',
    example : '오늘자 국밥 맛있다.'
  })
  @IsString()
  content : string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}