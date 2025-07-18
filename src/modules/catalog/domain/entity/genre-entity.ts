import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MusicGenre } from "./relation/music.genre-entity";
import { Music } from "./music-entity";

@Entity('genres')
export class Genre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @ManyToMany(() => Music, music => music.genres)
    musics: Music[];
}