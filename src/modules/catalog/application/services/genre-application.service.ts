import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateGenreUseCase } from "../use-cases/create.genre-usecase";
import { CreateGenreDTO } from "../../presenter/dtos/create-genre-dto";
import { Genre } from "../../domain/entity/genre-entity";
import { GenreDomainServiceImpl } from "../../domain/services/genre-domain.service";
import { UpdateGenreDTO } from "../../presenter/dtos/update-genre-dto";
import { UpdateGenreUseCase } from "../use-cases/update.genre-usecase";
import { UpdateResult } from "typeorm";

@Injectable()
export class GenreApplicationService {
    constructor(
        @Inject('CreateGenreUseCase')
        private readonly createGenreUseCase: CreateGenreUseCase,
        @Inject('GenreDomainService')
        private readonly genreDomainService: GenreDomainServiceImpl,
        @Inject('UpdateGenreUseCase')
        private readonly updateGenreUseCase: UpdateGenreUseCase,
    ) {}

    async create(dto: CreateGenreDTO): Promise<Genre> {
        try {
            return await this.createGenreUseCase.execute(dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to create a genre');
            }
            throw error;
        }
    }

    async update(id: number, dto: UpdateGenreDTO): Promise<UpdateResult> {
        try {
            return await this.updateGenreUseCase.execute(id, dto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to update this genre!');
            }
            throw error;
        }
    }

    async findAll(): Promise<Genre[]> {
        try {
            return await this.genreDomainService.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find all genres');
            }
            throw error;
        }
    }

    async findOneById(id: number): Promise<Genre | null> {
        try {
            return await this.genreDomainService.findOneById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find a genre');
            }
            throw error;
        }
    }
} 