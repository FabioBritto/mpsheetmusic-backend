import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Arranger } from "../enums/arranger-enum";
import { SheetMusic } from "./sheet.music-entity";
import { Genre } from "./genre-entity";

/**
 *  Esta entidade representa a música em si, não a versão e nem a partitura.
 *  Exemplo: "Ave Maria - Franz Schubert".
 *  Ela terá as informações básicas da música, como título, artista, compositor, etc.	
 */

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
    genres: Genre[];

    @OneToMany(() => SheetMusic, sheetMusic => sheetMusic.music)
    sheetMusics: SheetMusic[];
}