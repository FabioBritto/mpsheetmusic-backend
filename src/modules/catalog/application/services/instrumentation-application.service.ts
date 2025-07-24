import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateInstrumentationUseCase } from "../use-cases/create.instrumentation-usecase";
import { CreateInstrumentationDTO } from "../../presenter/dtos/create-instrumentation-dto";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";
import { InstrumentationDomainServiceImpl } from "../../domain/services/instrumentation-domain.service";
import { UpdateInstrumentationDTO } from "../../presenter/dtos/update-instrumentation-dto";
import { UpdateInstrumentationUseCase } from "../use-cases/update.instrumentation-usecase";
import { UpdateResult } from "typeorm";

@Injectable()
export class InstrumentationApplicationService {
    constructor(
        @Inject('CreateInstrumentationUseCase')
        private readonly createInstrumentationUseCase: CreateInstrumentationUseCase,
        @Inject('InstrumentationDomainService')
        private readonly instrumentationDomainService: InstrumentationDomainServiceImpl,
        @Inject('UpdateInstrumentationUseCase')
        private readonly updateInstrumentationUseCase: UpdateInstrumentationUseCase,
    ) {}

    async create(dto: CreateInstrumentationDTO): Promise<Instrumentation> {
        try {
            return await this.createInstrumentationUseCase.execute(dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to create an instrumentation');
            }
            throw error;
        }
    }

    async update(id: number, dto: UpdateInstrumentationDTO): Promise<UpdateResult> {
        try {
            return await this.updateInstrumentationUseCase.execute(id, dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to update this instrumentation!');
            }
            throw error;
        }
    }

    async findAll(): Promise<Instrumentation[]> {
        try {
            return await this.instrumentationDomainService.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find all instrumentations');
            }
            throw error;
        }
    }

    async findOneById(id: number): Promise<Instrumentation | null> {
        try {
            return await this.instrumentationDomainService.findOneById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find an instrumentation');
            }
            throw error;
        }
    }
} 