import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "../../domain/entity/music-entity";
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";

export class MusicRepository {
    constructor(
        @InjectRepository(Music)
        private readonly musicRepository: Repository<Music>,
    ) {}

    async create(data: Partial<Music>): Promise<Music> {
        const music = this.musicRepository.create(data);
        return this.musicRepository.save(music);
    }

    async update(options: {
        filter: FindOptionsWhere<Music>;
        update: Partial<Music>;
    }): Promise<UpdateResult> {
        return await this.musicRepository.update(options.filter, options.update);
    }

    async findOne(filter: FindOptionsWhere<Music>): Promise<Music | null> {
        return this.musicRepository.findOne({ where: filter });
    }

    async findOneById(id: number): Promise<Music | null> {
        return this.musicRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Music[]> {
        return this.musicRepository.find();
    }

}