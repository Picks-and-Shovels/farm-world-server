import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JoinUserDto{

  @ApiProperty({
    example : "billroses",
    description : '유저 이름',
    required : true,
  })
  @IsNotEmpty()
  @IsString()
  username : string;

  
  @ApiProperty({
    example : "Honghyunmin",
    description : '사람 이름',
    required : true,
  })
  @IsNotEmpty()
  @IsString()
  name : string;


  @ApiProperty({
    example : 23,
    description : '나이',
    required : true,
  })
  @IsNotEmpty()
  @IsNumber()
  age : number;


  @ApiProperty({
    example : "farmworld123!@#",
    description : '비밀번호',
    required : true,
  })
  @IsNotEmpty()
  @IsString()
  password : string;
}