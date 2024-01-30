import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Board } from 'src/boards/entities/boards.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
@Injectable()
export class CommentsService {

  constructor(
  @InjectRepository(Comment)
  private readonly commentsRepository: Repository<Comment>,
  @InjectRepository(Board)
  private readonly boardsRepository : Repository<Board>,
  ){}

  async getComment(postId : number) : Promise<Comment[]>
  {
     return this.commentsRepository.find({
      where : {id : postId},
      order: {
        createdAt : 'ASC'
      }
     })
  }

  async postComment(postId : number ,createCommentDto : CreateCommentDto ){
    const board = await this.boardsRepository.findOne({where : { id : postId}});
    const newComment = this.commentsRepository.create({
      board : board,
      content : createCommentDto.content,
      user : board.writer
    });

    return await this.boardsRepository.save(newComment);
  }

  async updateComment(postId : number, commentId : number,UpdateCommentDto : UpdateCommentDto){
    const comment = await this.commentsRepository.findOne({
      where:{
        id : commentId,
        board : {id : postId}
      }
    });

    this.commentsRepository.merge(comment,UpdateCommentDto);

    return await this.commentsRepository.save(comment);
  }

  async deleteComment(postId : number, commentId : number){
    const comment = await this.commentsRepository.findOne({
      where :{
        id : commentId,
        board : {id:postId},
      }
    });

    if(comment){
      await this.commentsRepository.remove(comment);
    }
  }
}

