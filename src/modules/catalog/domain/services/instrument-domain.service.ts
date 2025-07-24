import { Injectable } from "@nestjs/common";
import { InstrumentDomainService } from "../interfaces/instrument-domain.interface";
import { Instrument } from "../entity/instrument-entity";
import { InstrumentRepository } from "src/modules/catalog/infrastructure/repositories/instrument.repository";
import { FindOptionsWhere, UpdateResult } from "typeorm";
import { CreateInstrumentDTO } from "../../presenter/dtos/create-instrument-dto";

@Injectable()
export class InstrumentDomainServiceImpl implements InstrumentDomainService {
    constructor(
        private readonly instrumentRepository: InstrumentRepository,
    ) {}

    async create(entity: CreateInstrumentDTO): Promise<Instrument> {
        return this.instrumentRepository.create(entity);
    }

    async update({ filter, update }: { filter: FindOptionsWhere<Instrument>; update: Partial<Instrument>; }): Promise<UpdateResult> {
        return this.instrumentRepository.update({filter, update});
    }

    async findOne(filter: FindOptionsWhere<Instrument>): Promise<Instrument | null> {
        return this.instrumentRepository.findOne(filter);
    }

    async findOneById(id: number): Promise<Instrument | null> {
        return this.instrumentRepository.findOneById(id);
    }

    async findAll(): Promise<Instrument[]> {
        return this.instrumentRepository.findAll();
    }
} 