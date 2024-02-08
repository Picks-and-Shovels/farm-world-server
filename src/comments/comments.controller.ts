import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('게시판 댓글 API')
@Controller('boards/posts')
export class CommentsController {
  constructor(private readonly commentsService : CommentsService){}

  @ApiOperation({summary :'댓글 조회 API',description : '게시글 댓글 조회'})
  @Get(':post_id/comments')
  getCommment(@Param('post_id')postId : number){
    return this.commentsService.getComment(postId);
  }

  @ApiOperation({summary :'댓글 작성 API',description : '게시글 댓글 작성'})
  @Post(':post_id/comments')
  postComment(@Param('post_id')postId : number,@Body() createCommentDto : CreateCommentDto){
    return this.commentsService.postComment(postId,createCommentDto);
  }

  
  @ApiOperation({summary :'댓글 수정 API',description : '게시글 댓글 수정'})
  @Patch(':post_id/comments/:comment_id')
  updateComment(
    @Param('post_id') postId : number,
    @Param('comment_id') commentId : number,
    @Body()UpdateCommentDto :UpdateCommentDto,
    ){
      return this.commentsService.updateComment(postId,commentId,UpdateCommentDto)
  }

  @ApiOperation({summary :'댓글 삭제 API',description : '게시글 댓글 삭제'})
  @Delete(':post_id/comments/:comment_id')
  deleteComment(
    @Param('post_id') postId : number,
    @Param('comment_id') commentId : number
  ){
    return this.commentsService.deleteComment(postId,commentId);
  }
}
