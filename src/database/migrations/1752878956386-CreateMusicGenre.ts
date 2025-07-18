import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMusicGenre1752878956386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'musics_genres',
                columns: [
                    {
                        name: 'music_id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'genre_id',
                        type: 'int',
                        isPrimary: true,
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['music_id'],
                        referencedTableName: 'musics',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['genre_id'],
                        referencedTableName: 'genres',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('musics_genres')
    }

}
