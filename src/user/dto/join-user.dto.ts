import { IsNumber, IsString } from "class-validator";

export class JoinUserDto{

  @IsString()
  username : string;

  @IsString()
  name : string;

  @IsNumber()
  age : number;

  @IsString()
  password : string;
}