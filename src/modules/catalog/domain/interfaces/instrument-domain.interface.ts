import { FindOptionsWhere, UpdateResult } from "typeorm";
import { Instrument } from "../entity/instrument-entity";
import { CreateInstrumentDTO } from "../../presenter/dtos/create-instrument-dto";

export interface InstrumentDomainService {

    create(entity: CreateInstrumentDTO): Promise<Instrument>;

    update({ filter, update }: { filter: FindOptionsWhere<Instrument>; update: Partial<Instrument>; }): Promise<UpdateResult>;

    findOne(filter: FindOptionsWhere<Instrument>): Promise<Instrument | null>;

    findOneById(id: number): Promise<Instrument | null>;

    findAll(): Promise<Instrument[]>;
} 