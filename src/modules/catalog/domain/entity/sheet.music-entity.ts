import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Music } from './music-entity';
import { Instrumentation } from './instrumentation-entity';

@Entity('sheet_musics')
export class SheetMusic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Music, music => music.sheetMusics)
    music: Music;

    @ManyToOne(() => Instrumentation, instrumentation => instrumentation.sheetMusics)
    instrumentation: Instrumentation;

    @Column({ type: 'varchar', length: 255, nullable: true })
    youtubeLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    smdLink: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    smpLink: string;

}