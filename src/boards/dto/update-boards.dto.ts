import { PartialType } from "@nestjs/swagger";
import { CreateBoardsDto } from "./create-boards.dto";

export class UpdateBoardsDto extends PartialType(CreateBoardsDto) {}