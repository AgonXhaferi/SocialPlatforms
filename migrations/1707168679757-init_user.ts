import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitUser1707168679757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('user');

    await queryRunner.createTable(
      new Table({
        name: 'user',
        schema: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'user_name',
            type: 'varchar',
          },
          {
            name: 'postal_code',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'time_created',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'time_updated',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('user', true, true);
  }
}
