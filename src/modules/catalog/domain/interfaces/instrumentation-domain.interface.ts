import { FindOptionsWhere, UpdateResult } from "typeorm";
import { Instrumentation } from "../entity/instrumentation-entity";
import { CreateInstrumentationDTO } from "../../presenter/dtos/create-instrumentation-dto";

export interface InstrumentationDomainService {

    create(entity: CreateInstrumentationDTO): Promise<Instrumentation>;

    update({ filter, update }: { 
        filter: FindOptionsWhere<Instrumentation>; 
        update: Partial<Instrumentation>; 
    }): Promise<UpdateResult>;

    findOne(filter: FindOptionsWhere<Instrumentation>): Promise<Instrumentation | null>;

    findOneById(id: number): Promise<Instrumentation | null>;

    findAll(): Promise<Instrumentation[]>;
}