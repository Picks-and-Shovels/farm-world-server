import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  findOne(id: string) {
    return this.userRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ uuid: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete({ uuid: id });
  }
}
