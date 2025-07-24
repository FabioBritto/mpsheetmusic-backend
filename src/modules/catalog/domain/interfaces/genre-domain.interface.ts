import { Genre } from "../entity/genre-entity";
import { FindOptionsWhere, UpdateResult } from "typeorm";

export interface GenreDomainInterface {
    findAll(): Promise<Genre[]>;
    findOneById(id: number): Promise<Genre | null>;
    create(genre: Partial<Genre>): Promise<Genre>;
    update({ filter, update }: { filter: FindOptionsWhere<Genre>; update: Partial<Genre>; }): Promise<UpdateResult>;
    delete(id: number): Promise<void>;
} 