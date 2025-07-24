import { IsNotEmpty, IsString, IsEnum, IsArray, IsOptional } from "class-validator";
import { InstrumentFamily } from "../../domain/enums/instrument.family-enum";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";

export class CreateInstrumentDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(InstrumentFamily)
    family: InstrumentFamily;

    @IsOptional()
    @IsArray()
    instrumentations: Instrumentation[];
} 