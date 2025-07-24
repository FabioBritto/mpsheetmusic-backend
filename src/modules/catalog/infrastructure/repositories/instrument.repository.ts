import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { Instrument } from "../../domain/entity/instrument-entity";

export class InstrumentRepository {
    constructor(
        @InjectRepository(Instrument)
        private readonly instrumentRepository: Repository<Instrument>,
    ) {}

    async create(data: Partial<Instrument>): Promise<Instrument> {
        const instrument = this.instrumentRepository.create(data);
        return this.instrumentRepository.save(instrument);
    }

    async update(options: {
        filter: FindOptionsWhere<Instrument>;
        update: Partial<Instrument>;
    }): Promise<UpdateResult> {
        return this.instrumentRepository.update(options.filter, options.update);
    }

    async findAll(): Promise<Instrument[]> {
        return this.instrumentRepository.find();
    }

    async findOne(filter: FindOptionsWhere<Instrument>): Promise<Instrument | null> {
        return this.instrumentRepository.findOne({ where: filter });
    }

    async findOneById(id: number): Promise<Instrument | null> {
        return this.instrumentRepository.findOne({ where: { id } });
    }
} 