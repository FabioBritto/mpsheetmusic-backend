import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";

export class InstrumentationRepository {
    constructor(
        @InjectRepository(Instrumentation)
        private readonly instrumentationRepository: Repository<Instrumentation>,
    ) {}

    async create(data: Partial<Instrumentation>): Promise<Instrumentation> {
        const instrumentation = this.instrumentationRepository.create(data);
        return this.instrumentationRepository.save(instrumentation);
    }

    async update(options: {
        filter: FindOptionsWhere<Instrumentation>;
        update: Partial<Instrumentation>;
    }): Promise<UpdateResult> {
        return this.instrumentationRepository.update(options.filter, options.update);
    }

    async findAll(): Promise<Instrumentation[]> {
        return this.instrumentationRepository.find();
    }

    async findOne(filter: FindOptionsWhere<Instrumentation>): Promise<Instrumentation | null> {
        return this.instrumentationRepository.findOne({ where: filter });
    }

    async findOneById(id: number): Promise<Instrumentation | null> {
        return this.instrumentationRepository.findOne({ where: { id } });
    }
}