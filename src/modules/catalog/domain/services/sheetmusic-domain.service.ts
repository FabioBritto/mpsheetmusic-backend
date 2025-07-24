import { Injectable } from "@nestjs/common";
import { SheetMusicDomainService } from "../interfaces/sheetmusic-domain.interface";
import { SheetMusic } from "../entity/sheet.music-entity";
import { SheetMusicRepository } from "src/modules/catalog/infrastructure/repositories/sheetmusic.repository";
import { FindOptionsWhere, UpdateResult } from "typeorm";
import { CreateSheetMusicDTO } from "../../presenter/dtos/create-sheetmusic-dto";

@Injectable()
export class SheetMusicDomainServiceImpl implements SheetMusicDomainService {
    constructor(
        private readonly sheetMusicRepository: SheetMusicRepository,
    ) {}

    async create(entity: Partial<SheetMusic>): Promise<SheetMusic> {
        return this.sheetMusicRepository.create(entity);
    }

    async update({ filter, update }: { filter: FindOptionsWhere<SheetMusic>; update: Partial<SheetMusic>; }): Promise<UpdateResult> {
        return this.sheetMusicRepository.update({filter, update});
    }

    async findOne(filter: FindOptionsWhere<SheetMusic>): Promise<SheetMusic | null> {
        return this.sheetMusicRepository.findOne(filter);
    }

    async findOneById(id: number): Promise<SheetMusic | null> {
        return this.sheetMusicRepository.findOneById(id);
    }

    async findAll(): Promise<SheetMusic[]> {
        return this.sheetMusicRepository.findAll();
    }
} 