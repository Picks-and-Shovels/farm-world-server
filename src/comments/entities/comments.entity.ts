import { BaseEntity } from "src/base.entity";
import { Board } from "src/boards/entities/boards.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Comment extends  BaseEntity{
    @Column()
    content : string;

    @ManyToOne(type => Board,board=> board.comments)
    board : Board;

    @ManyToOne(type => User, user => user.comments)
    user : User;
}