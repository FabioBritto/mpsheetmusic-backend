// Importações necessárias para os testes
import { Test, TestingModule } from '@nestjs/testing'; // Importa as ferramentas de teste do NestJS
import { MusicController } from './music.controller'; // Importa o controller que será testado
import { MusicApplicationService } from '../../application/services/music-application.service'; // Importa o service que o controller usa
import { CreateMusicDTO } from '../dtos/create-music-dto'; // Importa o DTO de criação
import { UpdateMusicDTO } from '../dtos/update-music-dto'; // Importa o DTO de atualização
import { Music } from '../../domain/entity/music-entity'; // Importa a entidade Music
import { Arranger } from '../../domain/enums/arranger-enum'; // Importa o enum Arranger
import { BadRequestException } from '@nestjs/common'; // Importa a exceção para testar erros

// Dados mock para os testes - simulam dados reais que seriam enviados nas requisições
const mockCreateMusicDTO: CreateMusicDTO = {
    title: 'Test Music', // Título da música
    cover: 'test-cover.jpg', // URL da capa
    artist: 'Test Artist', // Artista (opcional)
    composer: 'Test Composer', // Compositor (opcional)
    arranger: Arranger.FABIO, // Arranjador (obrigatório)
    genre: { id: 1, name: 'Rock' } as any, // Gênero (obrigatório) - usando 'as any' para simplicidade
};

const mockUpdateMusicDTO: UpdateMusicDTO = {
    title: 'Updated Music', // Título atualizado
    cover: 'updated-cover.jpg', // Capa atualizada
    artist: 'Updated Artist', // Artista atualizado
    composer: 'Updated Composer', // Compositor atualizado
    arranger: Arranger.FERNANDO, // Arranjador atualizado
    genre: { id: 2, name: 'Jazz' } as any, // Gênero atualizado
    sheetMusics: [], // Lista de partituras (vazia para simplicidade)
};

// Mock da entidade Music que seria retornada pelo service
const mockMusic: Music = {
    id: 1, // ID único da música
    title: 'Test Music', // Título
    cover: 'test-cover.jpg', // URL da capa
    artist: 'Test Artist', // Artista
    composer: 'Test Composer', // Compositor
    arranger: Arranger.FABIO, // Arranjador
    genres: [], // Lista de gêneros (vazia para simplicidade)
    sheetMusics: [], // Lista de partituras (vazia para simplicidade)
};

// Mock da lista de músicas para o teste de findAll
const mockMusicList: Music[] = [
    mockMusic, // Primeira música
    { ...mockMusic, id: 2, title: 'Test Music 2' }, // Segunda música com ID e título diferentes
];

// Mock do service - simula o comportamento do MusicApplicationService
const mockMusicApplicationService = {
    create: jest.fn(), // Mock da função create
    update: jest.fn(), // Mock da função update
    findAll: jest.fn(), // Mock da função findAll
    findOneById: jest.fn(), // Mock da função findOneById
};

// Suite de testes para o MusicController
describe('MusicController', () => {
    // Declaração das variáveis que serão usadas nos testes
    let musicController: MusicController; // Instância do controller
    let musicApplicationService: MusicApplicationService; // Instância do service

    // Setup que roda antes de cada teste
    beforeEach(async () => {
        // Cria um módulo de teste com as dependências necessárias
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MusicController], // Registra o controller que será testado
            providers: [
                {
                    provide: MusicApplicationService, // Fornece o service como dependência
                    useValue: mockMusicApplicationService, // Usa o mock do service
                },
            ],
        }).compile(); // Compila o módulo de teste

        // Obtém as instâncias do controller e service do módulo compilado
        musicController = module.get<MusicController>(MusicController);
        musicApplicationService = module.get<MusicApplicationService>(MusicApplicationService);
    });

    // Teste para verificar se o controller foi criado corretamente
    it('should be defined', () => {
        expect(musicController).toBeDefined(); // Verifica se o controller existe
    });

    // Suite de testes para o método create
    describe('create', () => {
        // Teste para verificar se a criação de música funciona corretamente
        it('should create a music successfully', async () => {
            // Configura o mock para retornar uma música criada
            jest.spyOn(musicApplicationService, 'create').mockResolvedValue(mockMusic);

            // Chama o método create do controller
            const result = await musicController.create(mockCreateMusicDTO);

            // Verifica se o service foi chamado com os parâmetros corretos
            expect(musicApplicationService.create).toHaveBeenCalledWith(mockCreateMusicDTO);
            // Verifica se o resultado é igual ao mock
            expect(result).toEqual(mockMusic);
        });

        // Teste para verificar se erros são tratados corretamente
        it('should handle errors when creating music', async () => {
            // Configura o mock para lançar uma exceção
            const errorMessage = 'Error creating music';
            jest.spyOn(musicApplicationService, 'create').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(musicController.create(mockCreateMusicDTO)).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(musicApplicationService.create).toHaveBeenCalledWith(mockCreateMusicDTO);
        });
    });

    // Suite de testes para o método update
    describe('update', () => {
        // Teste para verificar se a atualização de música funciona corretamente
        it('should update a music successfully', async () => {
            const musicId = 1; // ID da música a ser atualizada
            const updatedMusic = { ...mockMusic, ...mockUpdateMusicDTO }; // Música com dados atualizados

            // Configura o mock para retornar a música atualizada
            jest.spyOn(musicApplicationService, 'update').mockResolvedValue(updatedMusic as any);

            // Chama o método update do controller
            const result = await musicController.update(musicId, mockUpdateMusicDTO);

            // Verifica se o service foi chamado com os parâmetros corretos
            expect(musicApplicationService.update).toHaveBeenCalledWith(musicId, mockUpdateMusicDTO);
            // Verifica se o resultado é igual à música atualizada
            expect(result).toEqual(updatedMusic);
        });

        // Teste para verificar se erros são tratados corretamente na atualização
        it('should handle errors when updating music', async () => {
            const musicId = 1; // ID da música
            const errorMessage = 'Error updating music';
            
            // Configura o mock para lançar uma exceção
            jest.spyOn(musicApplicationService, 'update').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(musicController.update(musicId, mockUpdateMusicDTO)).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(musicApplicationService.update).toHaveBeenCalledWith(musicId, mockUpdateMusicDTO);
        });
    });

    // Suite de testes para o método findAll
    describe('findAll', () => {
        // Teste para verificar se a busca de todas as músicas funciona corretamente
        it('should return all musics successfully', async () => {
            // Configura o mock para retornar a lista de músicas
            jest.spyOn(musicApplicationService, 'findAll').mockResolvedValue(mockMusicList);

            // Chama o método findAll do controller
            const result = await musicController.findAll();

            // Verifica se o service foi chamado
            expect(musicApplicationService.findAll).toHaveBeenCalled();
            // Verifica se o resultado é igual à lista de músicas
            expect(result).toEqual(mockMusicList);
        });

        // Teste para verificar se erros são tratados corretamente na busca de todas as músicas
        it('should handle errors when finding all musics', async () => {
            const errorMessage = 'Error finding all musics';
            
            // Configura o mock para lançar uma exceção
            jest.spyOn(musicApplicationService, 'findAll').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(musicController.findAll()).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(musicApplicationService.findAll).toHaveBeenCalled();
        });
    });

    // Suite de testes para o método findOneById
    describe('findOneById', () => {
        // Teste para verificar se a busca de música por ID funciona corretamente
        it('should return a music by id successfully', async () => {
            const musicId = 1; // ID da música a ser buscada

            // Configura o mock para retornar a música
            jest.spyOn(musicApplicationService, 'findOneById').mockResolvedValue(mockMusic);

            // Chama o método findOneById do controller
            const result = await musicController.findOneById(musicId);

            // Verifica se o service foi chamado com o ID correto
            expect(musicApplicationService.findOneById).toHaveBeenCalledWith(musicId);
            // Verifica se o resultado é igual à música
            expect(result).toEqual(mockMusic);
        });

        // Teste para verificar se retorna null quando música não é encontrada
        it('should return null when music is not found', async () => {
            const musicId = 999; // ID de uma música que não existe

            // Configura o mock para retornar null
            jest.spyOn(musicApplicationService, 'findOneById').mockResolvedValue(null);

            // Chama o método findOneById do controller
            const result = await musicController.findOneById(musicId);

            // Verifica se o service foi chamado com o ID correto
            expect(musicApplicationService.findOneById).toHaveBeenCalledWith(musicId);
            // Verifica se o resultado é null
            expect(result).toBeNull();
        });

        // Teste para verificar se erros são tratados corretamente na busca por ID
        it('should handle errors when finding music by id', async () => {
            const musicId = 1; // ID da música
            const errorMessage = 'Error finding music by id';
            
            // Configura o mock para lançar uma exceção
            jest.spyOn(musicApplicationService, 'findOneById').mockRejectedValue(new BadRequestException(errorMessage));

            // Verifica se a exceção é lançada corretamente
            await expect(musicController.findOneById(musicId)).rejects.toThrow(BadRequestException);
            // Verifica se o service foi chamado
            expect(musicApplicationService.findOneById).toHaveBeenCalledWith(musicId);
        });
    });

    // Suite de testes para verificar se os mocks são limpos após cada teste
    describe('mock cleanup', () => {
        // Teste para verificar se os mocks são limpos corretamente
        it('should clear mocks after each test', () => {
            // Verifica se os mocks foram limpos (não foram chamados)
            expect(mockMusicApplicationService.create).not.toHaveBeenCalled();
            expect(mockMusicApplicationService.update).not.toHaveBeenCalled();
            expect(mockMusicApplicationService.findAll).not.toHaveBeenCalled();
            expect(mockMusicApplicationService.findOneById).not.toHaveBeenCalled();
        });
    });
}); 