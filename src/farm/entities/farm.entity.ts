import { BaseEntity } from 'src/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Farm extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.farm)
  @JoinColumn()
  user: User;
}
