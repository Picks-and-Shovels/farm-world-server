import { BaseEntity } from 'src/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, OneToOne } from 'typeorm';

@Entity()
export class Farm extends BaseEntity {
  name: string;

  @OneToOne(() => User, (user) => user.farm)
  user: User;
}
