import { IsString } from "class-validator";

export class CreateBoardsDto{
  @IsString()
  title : string;

  @IsString()
  content : string;
  //writeId : User.
}