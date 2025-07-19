import { IsArray, IsOptional, IsString } from "class-validator";
import { Music } from "../../domain/entity/music-entity";

export class UpdateGenreDTO {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    musics: Music[];
} 