import { Injectable } from "@nestjs/common";
import { CreateInstrumentDTO } from "../../presenter/dtos/create-instrument-dto";
import { Instrument } from "../../domain/entity/instrument-entity";
import { InstrumentDomainServiceImpl } from "../../domain/services/instrument-domain.service";

@Injectable()
export class CreateInstrumentUseCase {
    constructor(
        private readonly instrumentDomainService: InstrumentDomainServiceImpl,
    ) {}

    async execute(dto: CreateInstrumentDTO): Promise<Instrument> {
        // Validações de negócio podem ser adicionadas aqui
        if (!dto.name || dto.name.trim().length === 0) {
            throw new Error("Instrument name cannot be empty");
        }

        if (!dto.family) {
            throw new Error("Instrument family cannot be empty");
        }

        // Verificar se já existe um instrumento com o mesmo nome
        const existingInstruments = await this.instrumentDomainService.findAll();
        const instrumentExists = existingInstruments.some(instrument => 
            instrument.name.toLowerCase() === dto.name.toLowerCase()
        );

        if (instrumentExists) {
            throw new Error("Instrument with this name already exists");
        }

        // Criar o instrumento
        const instrument = await this.instrumentDomainService.create({
            name: dto.name,
            family: dto.family,
            instrumentations: dto.instrumentations || [],
        });

        return instrument;
    }
} 