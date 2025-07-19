import { Injectable } from "@nestjs/common";
import { CreateGenreDTO } from "../../presenter/dtos/create-genre-dto";
import { Genre } from "../../domain/entity/genre-entity";
import { GenreDomainServiceImpl } from "../../domain/services/genre-domain.service";

@Injectable()
export class CreateGenreUseCase {
    constructor(
        private readonly genreDomainService: GenreDomainServiceImpl,
    ) {}

    async execute(dto: CreateGenreDTO): Promise<Genre> {
        // Validações de negócio podem ser adicionadas aqui
        if (!dto.name || dto.name.trim().length === 0) {
            throw new Error("Genre name cannot be empty");
        }

        // Verificar se já existe um gênero com o mesmo nome
        const existingGenres = await this.genreDomainService.findAll();
        const genreExists = existingGenres.some(genre => 
            genre.name.toLowerCase() === dto.name.toLowerCase()
        );

        if (genreExists) {
            throw new Error("Genre with this name already exists");
        }

        // Criar o gênero
        const genre = await this.genreDomainService.create({
            name: dto.name,
        });

        return genre;
    }
} 