import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";
import { Instrument } from "../../domain/entity/instrument-entity";

export class CreateInstrumentationDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    numberOfInstruments: number;

    @IsArray()
    @IsNotEmpty()
    instruments: Instrument[];
} 