import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { InstrumentFamily } from '../enums/instrument.family-enum';
import { Instrumentation } from './instrumentation-entity';

/**
 *  Esta entidade representa um instrumento musical.
 *  Exemplo: "Violino", "Violoncelo", "Violão", etc.
 */

@Entity('instruments')
export class Instrument {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ name: 'family', type: 'enum', enum: InstrumentFamily})
    family: InstrumentFamily;

    @ManyToMany(() => Instrumentation, instrumentation => instrumentation.instruments)
    instrumentations: Instrumentation[];
}