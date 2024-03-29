import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LogInDto{
  @ApiProperty({
    description: '사용자 이름',
    example: 'billroses',
  })
  @IsString()
  username : string;

  @ApiProperty({
    description: '비밀번호',
    example: 'farmworld123!@#',
  })
  @IsString()
  password : string;
}



