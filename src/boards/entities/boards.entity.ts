import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { BaseEntity } from "src/base.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Comment } from "src/comments/entities/comments.entity";

@Entity()
export class Board extends BaseEntity{
  

  @Column()
  title : string;

  @Column()
  content : string;

  @OneToOne(() => User,(user)=> user.farm)
  @JoinColumn()
  writer : User;

  @Column({
    type : 'int',
    default : 0
  })
  views : number;

  @Column({
    type : 'int',
    default : 0
  })
  likes : number;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(type=> Comment,comment => comment.board)
  comments : Comment[];
}