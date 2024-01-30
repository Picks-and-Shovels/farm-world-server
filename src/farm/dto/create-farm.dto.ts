import { IsString, MaxLength } from "class-validator";

export class CreateFarmDto {
  @IsString()
  @MaxLength(20)
  name: string;
}
