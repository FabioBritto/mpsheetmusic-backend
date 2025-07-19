import { Genre } from "../entity/genre-entity";
import { UpdateResult } from "typeorm";

export interface GenreDomainInterface {
    findAll(): Promise<Genre[]>;
    findOneById(id: number): Promise<Genre | null>;
    create(genre: Partial<Genre>): Promise<Genre>;
    update(id: number, genre: Partial<Genre>): Promise<UpdateResult>;
    delete(id: number): Promise<void>;
} 