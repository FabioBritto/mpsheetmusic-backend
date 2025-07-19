import { Provider } from "@nestjs/common";
import { UpdateGenreUseCase } from "../../application/use-cases/update.genre-usecase";
import { GenreDomainServiceImpl } from "../../domain/services/genre-domain.service";

export const UpdateGenreUseCaseProvider: Provider = {
    provide: 'UpdateGenreUseCase',
    useFactory: (genreDomainService: GenreDomainServiceImpl) => {
        return new UpdateGenreUseCase(genreDomainService);
    },
    inject: ['GenreDomainService'],
}; 