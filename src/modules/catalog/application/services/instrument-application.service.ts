import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateInstrumentUseCase } from "../use-cases/create.instrument-usecase";
import { CreateInstrumentDTO } from "../../presenter/dtos/create-instrument-dto";
import { Instrument } from "../../domain/entity/instrument-entity";
import { InstrumentDomainServiceImpl } from "../../domain/services/instrument-domain.service";
import { UpdateInstrumentDTO } from "../../presenter/dtos/update-instrument-dto";
import { UpdateInstrumentUseCase } from "../use-cases/update.instrument-usecase";
import { UpdateResult } from "typeorm";

@Injectable()
export class InstrumentApplicationService {
    constructor(
        @Inject('CreateInstrumentUseCase')
        private readonly createInstrumentUseCase: CreateInstrumentUseCase,
        @Inject('InstrumentDomainService')
        private readonly instrumentDomainService: InstrumentDomainServiceImpl,
        @Inject('UpdateInstrumentUseCase')
        private readonly updateInstrumentUseCase: UpdateInstrumentUseCase,
    ) {}

    async create(dto: CreateInstrumentDTO): Promise<Instrument> {
        try {
            return await this.createInstrumentUseCase.execute(dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to create an instrument');
            }
            throw error;
        }
    }

    async update(id: number, dto: UpdateInstrumentDTO): Promise<UpdateResult> {
        try {
            return await this.updateInstrumentUseCase.execute(id, dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to update this instrument!');
            }
            throw error;
        }
    }

    async findAll(): Promise<Instrument[]> {
        try {
            return await this.instrumentDomainService.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find all instruments');
            }
            throw error;
        }
    }

    async findOneById(id: number): Promise<Instrument | null> {
        try {
            return await this.instrumentDomainService.findOneById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find an instrument');
            }
            throw error;
        }
    }
} 