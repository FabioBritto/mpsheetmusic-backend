import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSheetMusicTable1752879980562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'sheet_musics',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'music_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'version_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'youtube_link',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'smd_link',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'smp_link',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['music_id'],
                        referencedTableName: 'musics',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['version_id'],
                        referencedTableName: 'versions',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sheet_musics');
    }

}
