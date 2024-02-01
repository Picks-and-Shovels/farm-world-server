import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/base.entity";

@Entity()
export class Tag extends BaseEntity{
  @Column()
  name : string;
} 
