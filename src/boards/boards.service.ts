import { Injectable } from '@nestjs/common';
import { CreateBoardsDto } from './dto/create-boards.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegerType, Repository } from 'typeorm';
import { Board } from './entities/boards.entity';
import { UpdateBoardsDto } from './dto/update-boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)  
    private readonly boardsRepository: Repository<Board>,
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

  async getPostById(postId : number ) : Promise<Board> {
    const post = await this.boardsRepository.findOne({where:{ id : postId}});
    
    if(post){
      post.views +=1;

      await this.boardsRepository.save(post);
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
  async increaseLikes(postId : number){
    const post = await this.boardsRepository.findOne({where : { id : postId}});

    post.likes +=1;

    return this.boardsRepository.save(post);
  }
}