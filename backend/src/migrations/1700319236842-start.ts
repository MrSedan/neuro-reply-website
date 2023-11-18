import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Start1700312110383 implements MigrationInterface {
    private userTable = new Table({
        name: 'user',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
            },
            {
                name: 'name',
                type: 'varchar',
                length: '255',
                isUnique: true,
                isNullable: true,
            },
        ],
    });

    private adminTable = new Table({
        name: 'admin',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
            },
        ],
    });

    private postTable = new Table({
        name: 'post',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'uuid',
            },
            {
                name: 'posted',
                type: 'boolean',
                default: false,
            },
            {
                name: 'from_user_id',
                type: 'integer',
                isNullable: false,
            },
            {
                name: 'text',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'media_group_id',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'images',
                type: 'integer[]',
            },
            {
                name: 'timestamp',
                type: 'timestamptz',
                default: 'now()',
            },
        ],
    });

    private imageTable = new Table({
        name: 'photo',
        columns: [
            {
                name: 'message_id',
                type: 'integer',
            },
            {
                name: 'post_id',
                type: 'uuid',
                isNullable: false,
            },
            {
                name: 'file_id',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'has_spoiler',
                type: 'boolean',
                isNullable: false,
            },
        ],
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(this.userTable);

        queryRunner.createTable(this.adminTable);

        queryRunner.createForeignKey(
            this.adminTable,
            new TableForeignKey({
                columnNames: ['id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
        queryRunner.createTable(this.postTable);

        queryRunner.createTable(this.imageTable);

        queryRunner.createForeignKey(
            this.imageTable,
            new TableForeignKey({
                columnNames: ['post_id'],
                referencedColumnNames: ['uuid'],
                referencedTableName: 'post',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.imageTable);
        queryRunner.dropTable(this.postTable);
        queryRunner.dropTable(this.adminTable);
        queryRunner.dropTable(this.userTable);
    }
}
