import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, JoinColumn} from "typeorm";
import { BaseEntity } from "src/base.entity";

@Entity()
export class Board extends BaseEntity{
  @Column()
  title : string;

  @Column()
  content : string;

  @OneToOne(() => User,(user)=> user.farm)
  @JoinColumn()
  writer : User;
}