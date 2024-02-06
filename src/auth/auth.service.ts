import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService : UserService){}

  async validateUser(username : string , pass : string): Promise<any>{
    const user = await this.userService.findOne(username);

    const isMatch = await bcrypt.compare(pass,user.password);

    if(user && isMatch){
      const { password, ...result} = user;

      return result;
    }
    return null;
  }
}
