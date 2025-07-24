import { Injectable } from "@nestjs/common";
import { UpdateInstrumentDTO } from "../../presenter/dtos/update-instrument-dto";
import { Instrument } from "../../domain/entity/instrument-entity";
import { InstrumentDomainServiceImpl } from "../../domain/services/instrument-domain.service";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateInstrumentUseCase {
    constructor(
        private readonly instrumentDomainService: InstrumentDomainServiceImpl,
    ) {}

    async execute(id: number, dto: UpdateInstrumentDTO): Promise<UpdateResult> {
        // Verificar se o instrumento existe
        const existingInstrument = await this.instrumentDomainService.findOneById(id);
        if (!existingInstrument) {
            throw new Error("Instrument not found");
        }

        // Preparar dados para atualização
        const updateData: Partial<Instrument> = {};

        // Atualizar nome se fornecido
        if (dto.name !== undefined) {
            if (!dto.name || dto.name.trim().length === 0) {
                throw new Error("Instrument name cannot be empty");
            }

            // Verificar se já existe outro instrumento com o mesmo nome
            const existingInstruments = await this.instrumentDomainService.findAll();
            const instrumentExists = existingInstruments.some(instrument => 
                instrument.id !== id && instrument.name.toLowerCase() === dto.name.toLowerCase()
            );

            if (instrumentExists) {
                throw new Error("Instrument with this name already exists");
            }

            updateData.name = dto.name;
        }

        // Atualizar família se fornecida
        if (dto.family !== undefined) {
            if (!dto.family) {
                throw new Error("Instrument family cannot be empty");
            }
            updateData.family = dto.family;
        }

        // Atualizar instrumentações se fornecidas
        if (dto.instrumentations !== undefined) {
            updateData.instrumentations = dto.instrumentations;
        }

        // Atualizar o instrumento
        return await this.instrumentDomainService.update({ filter: { id }, update: updateData });
    }
} 