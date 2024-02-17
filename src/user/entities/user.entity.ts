import { BaseEntity } from 'src/base.entity';
import { boardReadLike } from 'src/boards/entities/boardReadLike.entity';
import { Board } from 'src/boards/entities/boards.entity';
import { Comment } from 'src/comments/entities/comments.entity';
import { Farm } from 'src/farm/entities/farm.entity';
import { Journal } from 'src/journal/entities/journal.entity';
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ default : 'default' })
  nickname: string;

  @Column({ unique : true , length : 30})
  username : string;

  @Column()
  password : string;

  @Column({ length : 20})
  name : string;

  @Column()
  age : number;

  @OneToOne(() => Farm, (farm) => farm.user)
  @JoinColumn()
  farm: Farm;

  @OneToMany(type => Journal,journal => journal.user)
  journals : Journal[];
  
  @OneToMany(type => Comment,comment=> comment.user)
  comments : Comment[];

  @OneToMany(() => boardReadLike, boardRead => boardRead.user)
  readBoards: boardReadLike[];

  @OneToMany(() => boardReadLike, boardLike => boardLike.user)
  likedBoards: boardReadLike[];
}
