import { Body, Controller, Post, Query,Get, Param , Patch , Delete} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { timeStamp } from 'console';
import { UpdateBoardsDto } from './dto/update-boards.dto';

@Controller('boards/posts')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  
  @Post()
  createPost(@Body() createBoardsDto: CreateBoardsDto){
    return this.boardsService.create(createBoardsDto);
  }

  @Get()
  getPost(
    @Query('tag') tag : string,
    @Query('title') title : string,
    @Query("writer") writer : string
  ){
    return this.boardsService.getPosts({tag , title, writer});
  }
  @Get(':post_id')
  getPostById(@Param('post_id') postId : number){
    return this.boardsService.getPostById(postId);
  }

  @Patch(':post_id')
  updatePost(@Param('post_id') postId : number , @Body() UpdateBoardsDto : UpdateBoardsDto ) {
    return this.boardsService.updatePost(postId,UpdateBoardsDto);
  }
  @Delete(':post_id')
  deletePost(@Param('post_id') postId : number ){
    return this.boardsService.deletePost(postId)
  }
}
