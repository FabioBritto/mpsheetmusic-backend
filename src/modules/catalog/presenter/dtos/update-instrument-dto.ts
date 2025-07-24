import { IsOptional, IsString, IsEnum, IsArray } from "class-validator";
import { InstrumentFamily } from "../../domain/enums/instrument.family-enum";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";

export class UpdateInstrumentDTO {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(InstrumentFamily)
    family: InstrumentFamily;

    @IsOptional()
    @IsArray()
    instrumentations: Instrumentation[];
} 