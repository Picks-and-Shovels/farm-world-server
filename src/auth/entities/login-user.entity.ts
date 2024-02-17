import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class LoginRequestDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'ghd',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'gusals619',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}