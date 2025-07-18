import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Arranger } from "../enums/arranger-enum";
import { SheetMusic } from "./sheet.music-entity";
import { MusicGenre } from "./relation/music.genre-entity";
import { Genre } from "./genre-entity";

@Entity('musics')
export class Music {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    cover?: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    artist?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    composer?: string;

    @Column({ name: 'arranger', type: 'enum', enum: Arranger, nullable: true})
    arranger: Arranger;

    @ManyToMany(() => Genre, genre => genre.musics)
    @JoinTable({
        name: 'music_genre',
        joinColumn: 
        {
            name: 'music_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: 
        {
            name: 'genre_id',
            referencedColumnName: 'id',
        },
    })
    genres: Genre[];

    @OneToMany(() => SheetMusic, sheetMusic => sheetMusic.music)
    sheetMusics: SheetMusic[];
}