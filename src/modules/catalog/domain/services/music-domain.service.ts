import { MusicDomainService } from "../interfaces/music-domain.interface";
import { Music } from "../entity/music-entity";
import { FindOptionsWhere, UpdateResult } from "typeorm";
import { MusicRepository } from "../../infrastructure/repositories/music.repository";
import { CreateMusicDTO } from "../../presenter/dtos/create-music-dto";

export class MusicDomainServiceImpl implements MusicDomainService {
    constructor(
        private readonly musicRepository: MusicRepository,
    ) {}

    
    create(dto: CreateMusicDTO): Promise<Music> {
        return this.musicRepository.create(dto);
    }


    update({ filter, update }: { filter: FindOptionsWhere<Music>; update: Partial<Music>; }): Promise<UpdateResult> {
        throw new Error("Method not implemented.");
    }


    findOneById(id: number): Promise<Music | null> {
        return this.musicRepository.findOneById(id);
    }


    findAll(): Promise<Music[]> {
        return this.musicRepository.findAll();
    }

    
}