import { Inject, NotFoundException } from "@nestjs/common";
import { MusicDomainServiceImpl } from "../../domain/services/music-domain.service";
import { UpdateMusicDTO } from "../../presenter/dtos/update-music-dto";
import { UpdateResult } from "typeorm";

export class UpdateMusicUseCase {
    constructor(
        @Inject('MusicDomainService')
        private readonly musicDomainService: MusicDomainServiceImpl,
    ) {}

    async execute(id: number, dto: UpdateMusicDTO): Promise<UpdateResult> {

        const existingMusic = await this.musicDomainService.findOneById(id);
        if (!existingMusic) {
            throw new NotFoundException('Music not found');
        }
        return this.musicDomainService.update({
            filter: { id },
            update: dto,
        });
    }
}