import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Instrument } from './instrument-entity';
import { SheetMusic } from './sheet.music-entity';

@Entity('versions')
export class Version {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'int', nullable: false })
    numberOfInstruments: number;

    @OneToMany(() => Instrument, instrument => instrument.version)
    instruments: Instrument[];

    @OneToMany(() => SheetMusic, sheetMusic => sheetMusic.version)
    sheetMusics: SheetMusic[];
}