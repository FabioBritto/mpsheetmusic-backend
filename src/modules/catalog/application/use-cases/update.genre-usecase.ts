import { Injectable } from "@nestjs/common";
import { UpdateGenreDTO } from "../../presenter/dtos/update-genre-dto";
import { Genre } from "../../domain/entity/genre-entity";
import { GenreDomainServiceImpl } from "../../domain/services/genre-domain.service";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateGenreUseCase {
    constructor(
        private readonly genreDomainService: GenreDomainServiceImpl,
    ) {}

    async execute(id: number, dto: UpdateGenreDTO): Promise<UpdateResult> {
        // Verificar se o gênero existe
        const existingGenre = await this.genreDomainService.findOneById(id);
        if (!existingGenre) {
            throw new Error("Genre not found");
        }

        // Preparar dados para atualização
        const updateData: Partial<Genre> = {};

        // Atualizar nome se fornecido
        if (dto.name !== undefined) {
            if (!dto.name || dto.name.trim().length === 0) {
                throw new Error("Genre name cannot be empty");
            }

            // Verificar se já existe outro gênero com o mesmo nome
            const existingGenres = await this.genreDomainService.findAll();
            const genreExists = existingGenres.some(genre => 
                genre.id !== id && genre.name.toLowerCase() === dto.name.toLowerCase()
            );

            if (genreExists) {
                throw new Error("Genre with this name already exists");
            }

            updateData.name = dto.name;
        }

        // Atualizar músicas se fornecidas
        if (dto.musics !== undefined) {
            updateData.musics = dto.musics;
        }

        // Atualizar o gênero
        return await this.genreDomainService.update(id, updateData);
    }
} 