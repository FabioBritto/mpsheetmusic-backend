import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateSheetMusicUseCase } from "../use-cases/create.sheetmusic-usecase";
import { CreateSheetMusicDTO } from "../../presenter/dtos/create-sheetmusic-dto";
import { SheetMusic } from "../../domain/entity/sheet.music-entity";
import { SheetMusicDomainServiceImpl } from "../../domain/services/sheetmusic-domain.service";
import { UpdateSheetMusicDTO } from "../../presenter/dtos/update-sheetmusic-dto";
import { UpdateSheetMusicUseCase } from "../use-cases/update.sheetmusic-usecase";
import { UpdateResult } from "typeorm";

@Injectable()
export class SheetMusicApplicationService {
    constructor(
        @Inject('CreateSheetMusicUseCase')
        private readonly createSheetMusicUseCase: CreateSheetMusicUseCase,
        @Inject('SheetMusicDomainService')
        private readonly sheetMusicDomainService: SheetMusicDomainServiceImpl,
        @Inject('UpdateSheetMusicUseCase')
        private readonly updateSheetMusicUseCase: UpdateSheetMusicUseCase,
    ) {}

    async create(dto: CreateSheetMusicDTO): Promise<SheetMusic> {
        try {
            return await this.createSheetMusicUseCase.execute(dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to create a sheet music');
            }
            throw error;
        }
    }

    async update(id: number, dto: UpdateSheetMusicDTO): Promise<UpdateResult> {
        try {
            return await this.updateSheetMusicUseCase.execute(id, dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to update this sheet music!');
            }
            throw error;
        }
    }

    async findAll(): Promise<SheetMusic[]> {
        try {
            return await this.sheetMusicDomainService.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find all sheet musics');
            }
            throw error;
        }
    }

    async findOneById(id: number): Promise<SheetMusic | null> {
        try {
            return await this.sheetMusicDomainService.findOneById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find a sheet music');
            }
            throw error;
        }
    }
} 