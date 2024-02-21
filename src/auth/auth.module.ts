import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
//import { GoogleStrategy } from './google.strategy';

@Module({
  imports : [TypeOrmModule.forFeature([User]),PassportModule],
  providers: [AuthService,UserService,LocalStrategy    ],
})
export class AuthModule {}
