import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Music } from "./music-entity";

/**
 *  Esta entidade representa um gênero musical.
 *  Exemplo: "Clássico", "Jazz", "Pop", etc.
 */

@Entity('genres')
export class Genre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @ManyToMany(() => Music, music => music.genres)
    musics: Music[];
}