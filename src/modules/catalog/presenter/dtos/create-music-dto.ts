import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Arranger } from "../../domain/enums/arranger-enum";
import { Genre } from "../../domain/entity/genre-entity";

export class CreateMusicDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    cover: string;

    @IsOptional()
    @IsString()
    artist: string;

    @IsOptional()
    @IsString()
    composer: string;

    @IsNotEmpty()
    @IsEnum(Arranger)
    arranger: Arranger;

    @IsNotEmpty()
    @IsEnum(Genre)
    genre: Genre;
}