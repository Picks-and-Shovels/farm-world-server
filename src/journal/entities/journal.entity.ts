import { BaseEntity } from "src/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Journal extends BaseEntity{
  @Column()
  title : string;

  @Column()
  content : string;

  @Column({type :"date"})
  date : Date;
  
  @Column({nullable : true})
  photoUrl? : string;
  
  @ManyToOne(type => User, user => user.journals)
  @JoinColumn({name : 'userId'})
  user : User;
}