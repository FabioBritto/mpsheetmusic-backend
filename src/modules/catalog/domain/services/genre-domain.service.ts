import { Injectable } from "@nestjs/common";
import { GenreDomainInterface } from "../interfaces/genre-domain.interface";
import { Genre } from "../entity/genre-entity";
import { FindOptionsWhere, UpdateResult } from "typeorm";
import { GenreRepository } from "../../infrastructure/repositories/genre.repository";

@Injectable()
export class GenreDomainServiceImpl implements GenreDomainInterface {
    
    constructor(
        private readonly genreRepository: GenreRepository,
    ) {}

    async findAll(): Promise<Genre[]> {
        return this.genreRepository.findAll();
    }

    async findOneById(id: number): Promise<Genre | null> {
        return this.genreRepository.findOneById(id);
    }

    async create(genre: Partial<Genre>): Promise<Genre> {
        return this.genreRepository.create(genre);
    }

    async update({ filter, update }: { filter: FindOptionsWhere<Genre>; update: Partial<Genre>; }): Promise<UpdateResult> {
        return this.genreRepository.update({filter, update});
    }

    async delete(id: number): Promise<void> {
        return this.genreRepository.delete(id);
    }
} 