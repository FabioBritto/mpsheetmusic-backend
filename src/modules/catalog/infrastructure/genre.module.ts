import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "../domain/entity/genre-entity";
import { GenreController } from "../presenter/controllers/genre.controller";
import { GenreApplicationService } from "../application/services/genre-application.service";
import { GenreRepository } from "./repositories/genre.repository";
import { GenreDomainProvider } from "./providers/genre.domain.provider";
import { CreateGenreUseCaseProvider } from "./providers/create.genre-usecase-provider";
import { UpdateGenreUseCaseProvider } from "./providers/update.genre-usecase-provider";

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    controllers: [GenreController],
    providers: [
        GenreApplicationService,
        GenreRepository,
        GenreDomainProvider,
        CreateGenreUseCaseProvider,
        UpdateGenreUseCaseProvider,
    ],
    exports: [GenreApplicationService],
})
export class GenreModule {} 