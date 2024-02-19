import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegerType, Repository } from 'typeorm';
import { Board } from './entities/boards.entity';
import { UpdateBoardsDto } from './dto/update-boards.dto';
import { boardReadLike } from './entities/boardReadLike.entity';
import { NewLineKind } from 'typescript';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)  
    private readonly boardsRepository: Repository<Board>,
    @InjectRepository(boardReadLike)
    private readonly boardReadLikeRepository : Repository<boardReadLike>,
  ) {}

  // 게시글 만들기
  async create(createBoardsDto : CreateBoardsDto){
    const boardEntity = this.boardsRepository.create(createBoardsDto);
    return await this.boardsRepository.save(boardEntity);
  }

  // 게시글의 title만 return
  async getPosts(filterOptions : { tag?: string;  title? : string;  writer?:string}): Promise<any[]>{
    let query = this.boardsRepository.createQueryBuilder("post").select("post.title");

    if (filterOptions.tag) {
      query = query.andWhere("post.tag = :tag", { tag: filterOptions.tag });
    }
    if (filterOptions.title) {
      query = query.andWhere("post.title LIKE :title", { title: `%${filterOptions.title}%` });
    }
    if (filterOptions.writer) {
      query = query.andWhere("post.writer = :writer", { writer: filterOptions.writer });
    }
 
    const filteredPosts = await query.getMany();
    return filteredPosts;
  }

  async getPostById(postId : number ,user : any) : Promise<Board> {
    const post = await this.boardsRepository.findOne({where:{ id : postId}});
    
    if(user == null){
      throw new UnauthorizedException();
    }

    if(!post.reads){
      post.reads = [];
    }

    post.totalViews +=1;
    
    const existingRead = await this.boardReadLikeRepository.findOne({
      where:{
        board : {id:postId},
        user: {id : user.id},
      },
    })
    
    if(!existingRead){
      const newRead = new boardReadLike();
      newRead.board = post;
      newRead.user = user;
      newRead.liked = false;
      newRead.viewed = true;
      await this.boardReadLikeRepository.save(newRead);
    }
    return post;
  }

  async updatePost(postId : number, UpdateBoardsDto : UpdateBoardsDto) : Promise <Board> {
    const post = await this.boardsRepository.findOne({where : { id : postId}});
    
    for(const key in UpdateBoardsDto){
      if(UpdateBoardsDto.hasOwnProperty(key)&&(key ==='title'|| key =='content')){
          post[key] = UpdateBoardsDto[key];
      }
    }
    await this.boardsRepository.save(post);
    return post;
  }

  async deletePost(postId : number) : Promise <void>{
    const post = await this.boardsRepository.findOne({where : {id : postId}});

    if(post){
      await this.boardsRepository.remove(post);
    }
    
  }
  
  // 이 코드는 중복해서 좋아요를 누를 수 있다는 단점이 있음.
  async increaseLikes(postId : number,user : any){
    const post = await this.boardsRepository.findOne({
      where : { id : postId},
      relations:['likes']
    });

    if(!post){
      throw new Error('Not found');
    }
    let likeEntry = await this.boardReadLikeRepository.findOne({
      where: {
        user :{id : user.id},
        board : {id: postId},
        viewed : true,
      }
    });

    if(likeEntry){
      if(!likeEntry.liked){
        likeEntry.liked = true;
        post.totalLikes += 1; // Increment only if the like status changes
      }
    }
    else{
      likeEntry= new boardReadLike();
      likeEntry.board = post;
      likeEntry.user = user;
      likeEntry.liked = true;
      likeEntry.viewed = true;
      post.totalLikes += 1;
    }
    await this.boardReadLikeRepository.save(likeEntry);
    await this.boardsRepository.save(post);

  }
}