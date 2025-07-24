import { Injectable } from "@nestjs/common";
import { CreateSheetMusicDTO } from "../../presenter/dtos/create-sheetmusic-dto";
import { SheetMusic } from "../../domain/entity/sheet.music-entity";
import { SheetMusicDomainServiceImpl } from "../../domain/services/sheetmusic-domain.service";

@Injectable()
export class CreateSheetMusicUseCase {
    constructor(
        private readonly sheetMusicDomainService: SheetMusicDomainServiceImpl,
    ) {}

    async execute(dto: CreateSheetMusicDTO): Promise<SheetMusic> {
        // Validações de negócio podem ser adicionadas aqui
        if (!dto.musicId || dto.musicId <= 0) {
            throw new Error("Music ID must be valid");
        }

        if (!dto.instrumentationId || dto.instrumentationId <= 0) {
            throw new Error("Instrumentation ID must be valid");
        }

        // Verificar se já existe uma partitura com a mesma música e instrumentação
        const existingSheetMusics = await this.sheetMusicDomainService.findAll();
        const sheetMusicExists = existingSheetMusics.some(sheetMusic => 
            sheetMusic.music.id === dto.musicId && 
            sheetMusic.instrumentation.id === dto.instrumentationId
        );

        if (sheetMusicExists) {
            throw new Error("Sheet music with this music and instrumentation combination already exists");
        }

        // Criar a partitura
        const sheetMusic = await this.sheetMusicDomainService.create({
            music: { id: dto.musicId } as any,
            instrumentation: { id: dto.instrumentationId } as any,
            youtubeLink: dto.youtubeLink,
            smdLink: dto.smdLink,
            smpLink: dto.smpLink,
        });

        return sheetMusic;
    }
} 