import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('boards/posts')
export class CommentsController {
  constructor(private readonly commentsService : CommentsService){}

  @Get(':post_id/comments')
  getCommment(@Param('post_id')postId : number){
    return this.commentsService.getComment(postId);
  }

  @Post(':post_id/comments')
  postComment(@Param('post_id')postId : number,@Body() createCommentDto : CreateCommentDto){
    return this.commentsService.postComment(postId,createCommentDto);
  }

  @Patch(':post_id/comments/:comment_id')
  updateComment(
    @Param('post_id') postId : number,
    @Param('comment_id') commentId : number,
    @Body()UpdateCommentDto :UpdateCommentDto,
    ){
      return this.commentsService.updateComment(postId,commentId,UpdateCommentDto)
  }

  @Delete(':post_id/comments/:comment_id')
  deleteComment(
    @Param('post_id') postId : number,
    @Param('comment_id') commentId : number
  ){
    return this.commentsService.deleteComment(postId,commentId);
  }
}
