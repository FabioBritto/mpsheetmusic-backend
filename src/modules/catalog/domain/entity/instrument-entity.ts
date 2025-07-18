import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InstrumentFamily } from '../enums/instrument.family-enum';
import { Version } from './version-entity';


@Entity('instruments')
export class Instrument {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ name: 'family', type: 'enum', enum: InstrumentFamily})
    family: InstrumentFamily;

    @ManyToOne(() => Version, version => version.instruments)
    version: Version;
}