import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Instrument } from './instrument-entity';
import { SheetMusic } from './sheet.music-entity';

/**
 *  Esta entidade representa uma formação.
 *  Exemplo: "Quarteto de Cordas", "Quarteto de Violinos", "Quarteto de Violoncelos", etc.
 */

@Entity('instrumentations')
export class Instrumentation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'int', nullable: false })
    numberOfInstruments: number;

    @ManyToMany(() => Instrument, instrument => instrument.instrumentations)
    instruments: Instrument[];

    @OneToMany(() => SheetMusic, sheetMusic => sheetMusic.instrumentation)
    sheetMusics: SheetMusic[];
}