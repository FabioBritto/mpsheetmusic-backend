import { FindOptionsWhere, UpdateResult } from "typeorm";
import { Music } from "../entity/music-entity";
import { CreateMusicDTO } from "../../presenter/dtos/create-music-dto";

export interface MusicDomainService {
    
    create(entity: CreateMusicDTO): Promise<Music>;

    update({ filter, update } : {
        filter: FindOptionsWhere<Music>;
        update: Partial<Music>;
    }): Promise<UpdateResult>;

    // Nos arquivos mais "especializados", eu posso ter "findByArtist", "findByComposer", etc. Sempre vou chamar um findOne
    findOne(filter: FindOptionsWhere<Music>): Promise<Music | null>;
    
    findAll(): Promise<Music[]>;

}