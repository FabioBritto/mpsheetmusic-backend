import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInstrumentTable1752879478324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'instruments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'family',
                        type: 'enum',
                        enum: ['PIANO', 'PERCUSSION', 'STRING', 'WOODWIND', 'BRASS', 'ORCHESTRA'],
                        isNullable: false,
                    },
                    {
                        name: 'version_id',
                        type: 'int',
                        isNullable: false,
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['version_id'],
                        referencedTableName: 'versions',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    }
                ]
            }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('instruments');
    }

}
