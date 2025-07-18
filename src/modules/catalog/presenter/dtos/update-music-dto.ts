import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Genre } from "../../domain/entity/genre-entity";
import { Arranger } from "../../domain/enums/arranger-enum";
import { SheetMusic } from "../../domain/entity/sheet.music-entity";

export class UpdateMusicDTO {

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    cover: string;

    @IsOptional()
    @IsString()
    artist: string;

    @IsOptional()
    @IsString()
    composer: string;

    @IsOptional()
    @IsEnum(Arranger)
    arranger: Arranger;

    @IsOptional()
    @IsEnum(Genre)
    genre: Genre;

    @IsOptional()
    @IsArray()
    sheetMusics: SheetMusic[];
}