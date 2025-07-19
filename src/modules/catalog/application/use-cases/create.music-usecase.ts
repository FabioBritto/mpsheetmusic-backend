import { Inject } from "@nestjs/common";
import { Music } from "../../domain/entity/music-entity";
import { MusicDomainServiceImpl } from "../../domain/services/music-domain.service";
import { CreateMusicDTO } from "../../presenter/dtos/create-music-dto";

export class CreateMusicUseCase {
    constructor(
        @Inject('MusicDomainService')
        private readonly musicDomainService: MusicDomainServiceImpl,
    ) {}

    async execute(dto: CreateMusicDTO): Promise<Music> {
        return this.musicDomainService.create(dto);
    } 
}