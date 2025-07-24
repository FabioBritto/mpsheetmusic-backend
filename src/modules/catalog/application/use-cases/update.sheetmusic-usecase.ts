import { Injectable } from "@nestjs/common";
import { UpdateSheetMusicDTO } from "../../presenter/dtos/update-sheetmusic-dto";
import { SheetMusic } from "../../domain/entity/sheet.music-entity";
import { SheetMusicDomainServiceImpl } from "../../domain/services/sheetmusic-domain.service";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateSheetMusicUseCase {
    constructor(
        private readonly sheetMusicDomainService: SheetMusicDomainServiceImpl,
    ) {}

    async execute(id: number, dto: UpdateSheetMusicDTO): Promise<UpdateResult> {
        // Verificar se a partitura existe
        const existingSheetMusic = await this.sheetMusicDomainService.findOneById(id);
        if (!existingSheetMusic) {
            throw new Error("Sheet music not found");
        }

        // Preparar dados para atualização
        const updateData: Partial<SheetMusic> = {};

        // Atualizar música se fornecida
        if (dto.musicId !== undefined) {
            if (!dto.musicId || dto.musicId <= 0) {
                throw new Error("Music ID must be valid");
            }

            // Verificar se já existe outra partitura com a mesma música e instrumentação
            const existingSheetMusics = await this.sheetMusicDomainService.findAll();
            const sheetMusicExists = existingSheetMusics.some(sheetMusic => 
                sheetMusic.id !== id && 
                sheetMusic.music.id === dto.musicId && 
                sheetMusic.instrumentation.id === (dto.instrumentationId || existingSheetMusic.instrumentation.id)
            );

            if (sheetMusicExists) {
                throw new Error("Sheet music with this music and instrumentation combination already exists");
            }

            updateData.music = { id: dto.musicId } as any;
        }

        // Atualizar instrumentação se fornecida
        if (dto.instrumentationId !== undefined) {
            if (!dto.instrumentationId || dto.instrumentationId <= 0) {
                throw new Error("Instrumentation ID must be valid");
            }

            // Verificar se já existe outra partitura com a mesma música e instrumentação
            const existingSheetMusics = await this.sheetMusicDomainService.findAll();
            const sheetMusicExists = existingSheetMusics.some(sheetMusic => 
                sheetMusic.id !== id && 
                sheetMusic.music.id === (dto.musicId || existingSheetMusic.music.id) && 
                sheetMusic.instrumentation.id === dto.instrumentationId
            );

            if (sheetMusicExists) {
                throw new Error("Sheet music with this music and instrumentation combination already exists");
            }

            updateData.instrumentation = { id: dto.instrumentationId } as any;
        }

        // Atualizar links se fornecidos
        if (dto.youtubeLink !== undefined) {
            updateData.youtubeLink = dto.youtubeLink;
        }

        if (dto.smdLink !== undefined) {
            updateData.smdLink = dto.smdLink;
        }

        if (dto.smpLink !== undefined) {
            updateData.smpLink = dto.smpLink;
        }

        // Atualizar a partitura
        return await this.sheetMusicDomainService.update({ filter: { id }, update: updateData });
    }
} 