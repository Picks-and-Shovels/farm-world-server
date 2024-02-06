import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JoinUserDto } from './dto/join-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const userEntity = this.userRepository.create(createUserDto);
    return this.userRepository.save(userEntity);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(Username: string) : Promise <User | undefined>{
    return this.userRepository.findOne({
      where: {
        username: Username,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ uuid: id }, updateUserDto);
  }

  async remove(username : string) {
    return this.userRepository.delete({username : username});
  }

  async Join(joinUserDto : JoinUserDto){
    const newuser = await this.userRepository.findOne({
      where : {
        username : joinUserDto.username
      }
    });
    if(newuser){
      throw new UnauthorizedException('already exists.');
    }else{
      const userToSave = this.userRepository.create(joinUserDto);
      
      const hashedpassword = await bcrypt.hash(joinUserDto.password, 12);
      
      userToSave.password = hashedpassword;

      await this.userRepository.save(userToSave);
    }
  }
}
