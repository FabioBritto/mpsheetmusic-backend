import { IsOptional, IsString, IsNumber } from "class-validator";
import { Music } from "../../domain/entity/music-entity";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";

export class UpdateSheetMusicDTO {

    @IsOptional()
    @IsNumber()
    musicId: number;

    @IsOptional()
    @IsNumber()
    instrumentationId: number;

    @IsOptional()
    @IsString()
    youtubeLink: string;

    @IsOptional()
    @IsString()
    smdLink: string;

    @IsOptional()
    @IsString()
    smpLink: string;
} 