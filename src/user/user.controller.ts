import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoinUserDto } from './dto/join-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/auth/entities/login-user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') email: string) {
    return this.userService.remove(email);
  }

  @ApiTags('회원가입 API')
  @ApiOperation({summary : '사용자 생성 API', description : '사용자를 생성한다.'})
  @Post('join')
  Join(@Body() JoinUserDto : JoinUserDto){
    return this.userService.Join(JoinUserDto);
  }

  @ApiTags('로그인 API')
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiOperation({summary : '사용자 로그인 API', description : '사용자가 로그인한다.'})
  @ApiBody({type :LoginRequestDto , description : '로그인 요청 정보'})
  async login(@Request() req){
    return req.user;
  }
}
