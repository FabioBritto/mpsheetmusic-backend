import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateMusicUseCase } from "../use-cases/create-music-use-case";
import { CreateMusicDTO } from "../../presenter/dtos/create-music-dto";
import { Music } from "../../domain/entity/music-entity";
import { MusicDomainServiceImpl } from "../../domain/services/music-domain.service";
import { UpdateMusicDTO } from "../../presenter/dtos/update-music-dto";

@Injectable()
export class MusicApplicationService {
    constructor(
        @Inject('CreateMusicUseCase')
        private readonly createMusicUseCase: CreateMusicUseCase,
        @Inject('MusicDomainService')
        private readonly musicDomainService: MusicDomainServiceImpl,
    ) {}

    async create(dto: CreateMusicDTO): Promise<Music> {
        try {
            return await this.createMusicUseCase.execute(dto);
        } catch (error) {
            if  (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to create a music');
            }
            throw error;
        }
    }

    async update(id: number, dto: UpdateMusicDTO) {
        return null;
    }

    async findAll(): Promise<Music[]> {
        try {
            return await this.musicDomainService.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find all musics');
            }
            throw error;
        }
    }

    async findOneById(id: number): Promise<Music | null> {
        try {
            return await this.musicDomainService.findOneById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message || 'We have a problem to find a music');
            }
            throw error;
        }
    }    
    
}