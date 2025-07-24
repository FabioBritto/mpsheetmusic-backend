import { Injectable } from "@nestjs/common";
import { UpdateInstrumentationDTO } from "../../presenter/dtos/update-instrumentation-dto";
import { Instrumentation } from "../../domain/entity/instrumentation-entity";
import { InstrumentationDomainServiceImpl } from "../../domain/services/instrumentation-domain.service";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateInstrumentationUseCase {
    constructor(
        private readonly instrumentationDomainService: InstrumentationDomainServiceImpl,
    ) {}

    async execute(id: number, dto: UpdateInstrumentationDTO): Promise<UpdateResult> {
        // Verificar se a instrumentação existe
        const existingInstrumentation = await this.instrumentationDomainService.findOneById(id);
        if (!existingInstrumentation) {
            throw new Error("Instrumentation not found");
        }

        // Preparar dados para atualização
        const updateData: Partial<Instrumentation> = {};

        // Atualizar nome se fornecido
        if (dto.name !== undefined) {
            if (!dto.name || dto.name.trim().length === 0) {
                throw new Error("Instrumentation name cannot be empty");
            }

            // Verificar se já existe outra instrumentação com o mesmo nome
            const existingInstrumentations = await this.instrumentationDomainService.findAll();
            const instrumentationExists = existingInstrumentations.some(instrumentation => 
                instrumentation.id !== id && instrumentation.name.toLowerCase() === dto.name.toLowerCase()
            );

            if (instrumentationExists) {
                throw new Error("Instrumentation with this name already exists");
            }

            updateData.name = dto.name;
        }

        // Atualizar descrição se fornecida
        if (dto.description !== undefined) {
            if (!dto.description || dto.description.trim().length === 0) {
                throw new Error("Instrumentation description cannot be empty");
            }
            updateData.description = dto.description;
        }

        // Atualizar número de instrumentos se fornecido
        if (dto.numberOfInstruments !== undefined) {
            if (dto.numberOfInstruments <= 0) {
                throw new Error("Number of instruments must be greater than 0");
            }
            updateData.numberOfInstruments = dto.numberOfInstruments;
        }

        // Atualizar instrumentos se fornecidos
        if (dto.instruments !== undefined) {
            updateData.instruments = dto.instruments;
        }

        // Atualizar partituras se fornecidas
        if (dto.sheetMusics !== undefined) {
            updateData.sheetMusics = dto.sheetMusics;
        }

        // Atualizar a instrumentação
        return await this.instrumentationDomainService.update({ filter: { id }, update: updateData });
    }
} 