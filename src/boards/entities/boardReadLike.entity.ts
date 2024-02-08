import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./boards.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class boardReadLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, board => board.likes)
  board: Board;

  @ManyToOne(() => User, user => user.likedBoards)
  user: User;

  @Column()
  liked:boolean;

  @Column()
  viewed : boolean;
}