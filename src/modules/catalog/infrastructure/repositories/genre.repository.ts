import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Genre } from "../../domain/entity/genre-entity";

@Injectable()
export class GenreRepository {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}

    async findAll(): Promise<Genre[]> {
        return this.genreRepository.find({
            relations: ['musics'],
        });
    }

    async findOneById(id: number): Promise<Genre | null> {
        return this.genreRepository.findOne({
            where: { id },
            relations: ['musics'],
        });
    }

    async create(genre: Partial<Genre>): Promise<Genre> {
        const newGenre = this.genreRepository.create(genre);
        return this.genreRepository.save(newGenre);
    }

    async update(id: number, genre: Partial<Genre>): Promise<UpdateResult> {
        return await this.genreRepository.update(id, genre);
    }

    async delete(id: number): Promise<void> {
        await this.genreRepository.delete(id);
    }

    async findByName(name: string): Promise<Genre | null> {
        return this.genreRepository.findOne({
            where: { name },
        });
    }
} 