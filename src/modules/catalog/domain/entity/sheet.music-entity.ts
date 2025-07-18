import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Music } from './music-entity';
import { Version } from './version-entity';

@Entity('sheet_musics')
export class SheetMusic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Music, music => music.sheetMusics)
    music: Music;

    @ManyToOne(() => Version, version => version.sheetMusics)
    version: Version;

    @Column({ type: 'varchar', length: 255, nullable: true })
    youtubeLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    smdLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    smpLink: string;

}