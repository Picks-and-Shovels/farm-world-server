import { IsString } from "class-validator";
import { CreateDateColumn,UpdateDateColumn } from "typeorm";
export class CreateCommentDto{
  @IsString()
  content : string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}