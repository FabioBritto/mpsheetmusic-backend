import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { Music } from "../../domain/entity/music-entity";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";

export class CreateSheetMusicDTO {

    @IsNumber()
    @IsNotEmpty()
    musicId: number;

    @IsNumber()
    @IsNotEmpty()
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