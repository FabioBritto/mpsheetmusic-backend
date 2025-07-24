import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { SheetMusic } from "../../domain/entity/sheet.music-entity";

export class SheetMusicRepository {
    constructor(
        @InjectRepository(SheetMusic)
        private readonly sheetMusicRepository: Repository<SheetMusic>,
    ) {}

    async create(data: Partial<SheetMusic>): Promise<SheetMusic> {
        const sheetMusic = this.sheetMusicRepository.create(data);
        return this.sheetMusicRepository.save(sheetMusic);
    }

    async update(options: {
        filter: FindOptionsWhere<SheetMusic>;
        update: Partial<SheetMusic>;
    }): Promise<UpdateResult> {
        return this.sheetMusicRepository.update(options.filter, options.update);
    }

    async findAll(): Promise<SheetMusic[]> {
        return this.sheetMusicRepository.find({
            relations: ['music', 'instrumentation']
        });
    }

    async findOne(filter: FindOptionsWhere<SheetMusic>): Promise<SheetMusic | null> {
        return this.sheetMusicRepository.findOne({ 
            where: filter,
            relations: ['music', 'instrumentation']
        });
    }

    async findOneById(id: number): Promise<SheetMusic | null> {
        return this.sheetMusicRepository.findOne({ 
            where: { id },
            relations: ['music', 'instrumentation']
        });
    }
} 