import { Injectable } from "@nestjs/common";
import { InstrumentationDomainService } from "../interfaces/instrumentation-domain.interface";
import { Instrumentation } from "../entity/instrumentation-entity";
import { InstrumentationRepository } from "src/modules/catalog/infrastructure/repositories/instrumentation.repository";
import { FindOptionsWhere, UpdateResult } from "typeorm";
import { CreateInstrumentationDTO } from "../../presenter/dtos/create-instrumentation-dto";

@Injectable()
export class InstrumentationDomainServiceImpl implements InstrumentationDomainService {
    constructor(
        private readonly instrumentationRepository: InstrumentationRepository,
    ) {}

    async create(entity: CreateInstrumentationDTO): Promise<Instrumentation> {
        return this.instrumentationRepository.create(entity);
    }

    async update({ filter, update }: { filter: FindOptionsWhere<Instrumentation>; update: Partial<Instrumentation>; }): Promise<UpdateResult> {
        return this.instrumentationRepository.update({filter, update});
    }

    async findOne(filter: FindOptionsWhere<Instrumentation>): Promise<Instrumentation | null> {
        return this.instrumentationRepository.findOne(filter);
    }

    async findOneById(id: number): Promise<Instrumentation | null> {
        return this.instrumentationRepository.findOneById(id);
    }

    async findAll(): Promise<Instrumentation[]> {
        return this.instrumentationRepository.findAll();
    }
    
    
}