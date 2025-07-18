import { Entity, PrimaryColumn } from "typeorm";

@Entity('musics_genres')
export class MusicGenre {

    @PrimaryColumn()
    musicId: number;

    @PrimaryColumn()
    genreId: number;
}