// Importações necessárias para os testes
import { Test, TestingModule } from '@nestjs/testing'; // Importa as ferramentas de teste do NestJS
import { GenreController } from './genre.controller'; // Importa o controller que será testado
import { GenreApplicationService } from '../../application/services/genre-application.service'; // Importa o service que o controller usa
import { CreateGenreDTO } from '../dtos/create-genre-dto'; // Importa o DTO de criação
import { UpdateGenreDTO } from '../dtos/update-genre-dto'; // Importa o DTO de atualização
import { Genre } from '../../domain/entity/genre-entity'; // Importa a entidade Genre
import { BadRequestException } from '@nestjs/common'; // Importa a exceção para testar erros

// Dados mock para os testes - simulam dados reais que seriam enviados nas requisições
const mockCreateGenreDTO: CreateGenreDTO = {
    name: 'Rock', // Nome do gênero
};

const mockUpdateGenreDTO: UpdateGenreDTO = {
    name: 'Jazz', // Nome atualizado do gênero
    musics: [], // Lista de músicas (vazia para simplicidade)
};

// Mock da entidade Genre que seria retornada pelo service
const mockGenre: Genre = {
    id: 1, // ID único do gênero
    name: 'Rock', // Nome do gênero
    musics: [], // Lista de músicas (vazia para simplicidade)
};

// Mock da lista de gêneros para o teste de findAll
const mockGenreList: Genre[] = [
    mockGenre, // Primeiro gênero
    { ...mockGenre, id: 2, name: 'Jazz' }, // Segundo gênero com ID e nome diferentes
];

// Mock do service - simula o comportamento do GenreApplicationService
const mockGenreApplicationService = {
    create: jest.fn(), // Mock da função create
    update: jest.fn(), // Mock da função update
    findAll: jest.fn(), // Mock da função findAll
    findOneById: jest.fn(), // Mock da função findOneById
};

// Suite de testes para o GenreController
describe('GenreController', () => {
    // Declaração das variáveis que serão usadas nos testes
    let genreController: GenreController; // Instância do controller
    let genreApplicationService: GenreApplicationService; // Instância do service

    // Setup que roda antes de cada teste
    beforeEach(async () => {
        // Cria um módulo de teste com as dependências necessárias
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GenreController], // Registra o controller que será testado
            providers: [
                {
                    provide: GenreApplicationService, // Fornece o service como dependência
                    useValue: mockGenreApplicationService, // Usa o mock do service
                },
            ],
        }).compile(); // Compila o módulo de teste

        // Obtém as instâncias do controller e service do módulo compilado
        genreController = module.get<GenreController>(GenreController);
        genreApplicationService = module.get<GenreApplicationService>(GenreApplicationService);
    });

    // Limpa todos os mocks após cada teste
    afterEach(() => {
        jest.clearAllMocks(); // Limpa o histórico de chamadas dos mocks
    });

    // Teste para verificar se o controller foi criado corretamente
    it('should be defined', () => {
        expect(genreController).toBeDefined(); // Verifica se o controller existe
    });

    // Suite de testes para o método create
    describe('create', () => {
        // Teste para verificar se a criação de gênero funciona corretamente
        it('should create a genre successfully', async () => {
            // Configura o mock para retornar um gênero criado
            jest.spyOn(genreApplicationService, 'create').mockResolvedValue(mockGenre);

            // Chama o método create do controller
            const result = await genreController.create(mockCreateGenreDTO);

            // Verifica se o service foi chamado com os parâmetros corretos
            expect(genreApplicationService.create).toHaveBeenCalledWith(mockCreateGenreDTO);
            // Verifica se o resultado é igual ao mock
            expect(result).toEqual(mockGenre);
        });

        // Teste para verificar se erros são tratados corretamente
        it('should handle errors when creating genre', async () => {
            // Configura o mock para lançar uma exceção
            const errorMessage = 'Error creating genre';
            jest.spyOn(genreApplicationService, 'create').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(genreController.create(mockCreateGenreDTO)).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(genreApplicationService.create).toHaveBeenCalledWith(mockCreateGenreDTO);
        });
    });

    // Suite de testes para o método update
    describe('update', () => {
        // Teste para verificar se a atualização de gênero funciona corretamente
        it('should update a genre successfully', async () => {
            const genreId = 1; // ID do gênero a ser atualizado
            const updatedGenre = { ...mockGenre, ...mockUpdateGenreDTO }; // Gênero com dados atualizados

            // Configura o mock para retornar o gênero atualizado
            jest.spyOn(genreApplicationService, 'update').mockResolvedValue(updatedGenre as any);

            // Chama o método update do controller
            const result = await genreController.update(genreId, mockUpdateGenreDTO);

            // Verifica se o service foi chamado com os parâmetros corretos
            expect(genreApplicationService.update).toHaveBeenCalledWith(genreId, mockUpdateGenreDTO);
            // Verifica se o resultado é igual ao gênero atualizado
            expect(result).toEqual(updatedGenre);
        });

        // Teste para verificar se erros são tratados corretamente na atualização
        it('should handle errors when updating genre', async () => {
            const genreId = 1; // ID do gênero
            const errorMessage = 'Error updating genre';
            
            // Configura o mock para lançar uma exceção
            jest.spyOn(genreApplicationService, 'update').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(genreController.update(genreId, mockUpdateGenreDTO)).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(genreApplicationService.update).toHaveBeenCalledWith(genreId, mockUpdateGenreDTO);
        });
    });

    // Suite de testes para o método findAll
    describe('findAll', () => {
        // Teste para verificar se a busca de todos os gêneros funciona corretamente
        it('should return all genres successfully', async () => {
            // Configura o mock para retornar a lista de gêneros
            jest.spyOn(genreApplicationService, 'findAll').mockResolvedValue(mockGenreList);

            // Chama o método findAll do controller
            const result = await genreController.findAll();

            // Verifica se o service foi chamado
            expect(genreApplicationService.findAll).toHaveBeenCalled();
            // Verifica se o resultado é igual à lista de gêneros
            expect(result).toEqual(mockGenreList);
        });

        // Teste para verificar se erros são tratados corretamente na busca de todos os gêneros
        it('should handle errors when finding all genres', async () => {
            const errorMessage = 'Error finding all genres';
            
            // Configura o mock para lançar uma exceção
            jest.spyOn(genreApplicationService, 'findAll').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(genreController.findAll()).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(genreApplicationService.findAll).toHaveBeenCalled();
        });
    });

    // Suite de testes para o método findOneById
    describe('findOneById', () => {
        // Teste para verificar se a busca de gênero por ID funciona corretamente
        it('should return a genre by id successfully', async () => {
            const genreId = 1; // ID do gênero a ser buscado

            // Configura o mock para retornar o gênero
            jest.spyOn(genreApplicationService, 'findOneById').mockResolvedValue(mockGenre);

            // Chama o método findOneById do controller
            const result = await genreController.findOneById(genreId);

            // Verifica se o service foi chamado com o ID correto
            expect(genreApplicationService.findOneById).toHaveBeenCalledWith(genreId);
            // Verifica se o resultado é igual ao gênero
            expect(result).toEqual(mockGenre);
        });

        // Teste para verificar se retorna null quando gênero não é encontrado
        it('should return null when genre is not found', async () => {
            const genreId = 999; // ID de um gênero que não existe

            // Configura o mock para retornar null
            jest.spyOn(genreApplicationService, 'findOneById').mockResolvedValue(null);

            // Chama o método findOneById do controller
            const result = await genreController.findOneById(genreId);

            // Verifica se o service foi chamado com o ID correto
            expect(genreApplicationService.findOneById).toHaveBeenCalledWith(genreId);
            // Verifica se o resultado é null
            expect(result).toBeNull();
        });

        // Teste para verificar se erros são tratados corretamente na busca por ID
        it('should handle errors when finding genre by id', async () => {
            const genreId = 1; // ID do gênero
            const errorMessage = 'Error finding genre by id';
            
            // Configura o mock para lançar uma exceção
            jest.spyOn(genreApplicationService, 'findOneById').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(genreController.findOneById(genreId)).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(genreApplicationService.findOneById).toHaveBeenCalledWith(genreId);
        });
    });
}); 