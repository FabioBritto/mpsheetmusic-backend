import { Injectable } from "@nestjs/common";
import { CreateInstrumentationDTO } from "../../presenter/dtos/create-instrumentation-dto";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";
import { InstrumentationDomainServiceImpl } from "../../domain/services/instrumentation-domain.service";

@Injectable()
export class CreateInstrumentationUseCase {
    constructor(
        private readonly instrumentationDomainService: InstrumentationDomainServiceImpl,
    ) {}

    async execute(dto: CreateInstrumentationDTO): Promise<Instrumentation> {
        // Validações de negócio podem ser adicionadas aqui
        if (!dto.name || dto.name.trim().length === 0) {
            throw new Error("Instrumentation name cannot be empty");
        }

        if (!dto.description || dto.description.trim().length === 0) {
            throw new Error("Instrumentation description cannot be empty");
        }

        if (dto.numberOfInstruments <= 0) {
            throw new Error("Number of instruments must be greater than 0");
        }

        // Verificar se já existe uma instrumentação com o mesmo nome
        const existingInstrumentations = await this.instrumentationDomainService.findAll();
        const instrumentationExists = existingInstrumentations.some(instrumentation => 
            instrumentation.name.toLowerCase() === dto.name.toLowerCase()
        );

        if (instrumentationExists) {
            throw new Error("Instrumentation with this name already exists");
        }

        // Criar a instrumentação
        const instrumentation = await this.instrumentationDomainService.create({
            name: dto.name,
            description: dto.description,
            numberOfInstruments: dto.numberOfInstruments,
            instruments: dto.instruments || [],
        });

        return instrumentation;
    }
} 