import { FindOptionsWhere, UpdateResult } from "typeorm";
import { SheetMusic } from "../entity/sheet.music-entity";
import { CreateSheetMusicDTO } from "../../presenter/dtos/create-sheetmusic-dto";

export interface SheetMusicDomainService {

    create(entity: Partial<SheetMusic>): Promise<SheetMusic>;

    update({ filter, update }: { filter: FindOptionsWhere<SheetMusic>; update: Partial<SheetMusic>; }): Promise<UpdateResult>;

    findOne(filter: FindOptionsWhere<SheetMusic>): Promise<SheetMusic | null>;

    findOneById(id: number): Promise<SheetMusic | null>;

    findAll(): Promise<SheetMusic[]>;
} 