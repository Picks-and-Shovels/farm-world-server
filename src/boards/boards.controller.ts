import { Body, Controller, Post, Query,Get, Param , Patch , Delete, Request} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { UpdateBoardsDto } from './dto/update-boards.dto';
import { ApiOperation, ApiTags,ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('게시판 API')
@Controller('boards/posts')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  
  @ApiOperation({summary : "게시글 작성 API",description : "게시글을 생성한다"})
  @Post()
  createPost(@Body() createBoardsDto: CreateBoardsDto){
    return this.boardsService.create(createBoardsDto);
  }

  @ApiOperation({summary : "게시글 조회 API",description : "(Option에 따라) 게시물을 조회한다."})
  @ApiQuery({ name: 'tag', required: false, description: '게시물의 태그로 필터링' })
  @ApiQuery({ name: 'title', required: false, description: '게시물의 제목으로 필터링' })
  @ApiQuery({ name: 'writer', required: false, description: '게시물의 작성자로 필터링' })
  @Get()
  getPost(
    @Query('tag') tag : string,
    @Query('title') title : string,
    @Query("writer") writer : string
  ){
    return this.boardsService.getPosts({tag , title, writer});
  }

  @ApiOperation({summary : "게시글 상세 조회 API",description : "게시글을 상세 조회한다."})
  @ApiParam({ name : 'post_id',description : '게시물 ID', example: 52, required:true})
  @ApiBearerAuth()
  @Get(':post_id')
  getPostById(@Param('post_id') postId : number, @Request() req){
    const user = req.session.user;
    return this.boardsService.getPostById(postId,user);
  }

  @ApiOperation({summary : "게시물 수정 API", description : "게시물을 수정한다."})
  @ApiParam({name : 'post_id', description : '게시물 ID',example : 52, required :true})
  @Patch(':post_id')
  updatePost(@Param('post_id') postId : number , @Body() UpdateBoardsDto : UpdateBoardsDto ) {
    return this.boardsService.updatePost(postId,UpdateBoardsDto);
  }

  @ApiOperation({summary : "게시물 삭제 API",description : "게시물을 삭제한다"})
  @ApiParam({name : 'post_id', description : '게시물 ID',example : 52 ,  required : true})
  @Delete(':post_id')
  deletePost(@Param('post_id') postId : number ){
    return this.boardsService.deletePost(postId)
  }

  @ApiOperation({summary : "게시물 좋아요 API",description : "게시물에 좋아요를 누른다."})
  @ApiParam({name : 'post_id', description : '게시물 ID',example : 52 ,  required : true})
  @Patch(':post_id/like')
  increasePostLikes(@Param('post_id') postId : number, @Request() req){
    const user = req.session.user;
    return this.boardsService.increaseLikes(postId,user);
  }
}
