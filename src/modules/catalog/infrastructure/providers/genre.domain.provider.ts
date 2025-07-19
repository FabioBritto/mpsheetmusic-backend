import { Provider } from "@nestjs/common";
import { GenreDomainServiceImpl } from "../../domain/services/genre-domain.service";
import { GenreRepository } from "../repositories/genre.repository";

export const GenreDomainProvider: Provider = {
    provide: 'GenreDomainService',
    useFactory: (genreRepository: GenreRepository) => {
        const genreDomainService = new GenreDomainServiceImpl();
        
        // Substituir os métodos não implementados pelos do repository
        genreDomainService.findAll = () => genreRepository.findAll();
        genreDomainService.findOneById = (id: number) => genreRepository.findOneById(id);
        genreDomainService.create = (genre: any) => genreRepository.create(genre);
        genreDomainService.update = (id: number, genre: any) => genreRepository.update(id, genre);
        genreDomainService.delete = (id: number) => genreRepository.delete(id);
        
        return genreDomainService;
    },
    inject: [GenreRepository],
}; 