import { IsArray, IsNotEmpty, IsNumber, IsString  } from "class-validator";
import { Instrument } from "../../domain/entity/instrument-entity";

export class CreateVersionDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    numberOfInstruments: number;

    @IsArray()
    @IsNotEmpty()
    instruments: Instrument[];
}