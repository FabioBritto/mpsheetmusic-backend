import { IsOptional, IsString, IsNumber, IsArray } from "class-validator";
import { Instrument } from "../../domain/entity/instrument-entity";
import { SheetMusic } from "../../domain/entity/sheet.music-entity";

export class UpdateInstrumentationDTO {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    numberOfInstruments: number;

    @IsOptional()
    @IsArray()
    instruments: Instrument[];

    @IsOptional()
    @IsArray()
    sheetMusics: SheetMusic[];
} 