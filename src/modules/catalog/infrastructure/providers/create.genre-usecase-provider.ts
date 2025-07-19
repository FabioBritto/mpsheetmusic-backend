import { Provider } from "@nestjs/common";
import { CreateGenreUseCase } from "../../application/use-cases/create.genre-usecase";
import { GenreDomainServiceImpl } from "../../domain/services/genre-domain.service";

export const CreateGenreUseCaseProvider: Provider = {
    provide: 'CreateGenreUseCase',
    useFactory: (genreDomainService: GenreDomainServiceImpl) => {
        return new CreateGenreUseCase(genreDomainService);
    },
    inject: ['GenreDomainService'],
}; 