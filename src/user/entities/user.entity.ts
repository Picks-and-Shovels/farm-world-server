import { BaseEntity } from 'src/base.entity';
import { Comment } from 'src/comments/entities/comments.entity';
import { Farm } from 'src/farm/entities/farm.entity';
import { Column, Entity, Generated, JoinColumn, OneToMany, OneToOne } from 'typeorm';

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

  @OneToMany(type => Comment,comment=> comment.user)
  comments : Comment[]
}
