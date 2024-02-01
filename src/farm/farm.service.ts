import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository : Repository<Farm>
  ) {}
  async create(createFarmDto: CreateFarmDto) {
    const farmEntity = this.farmRepository.create(createFarmDto);
    return await this.farmRepository.save(farmEntity);
  }

  findAll() {
    return `This action returns all farm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
