import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitUser1707168679757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('user');

    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        schema: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user.user_roles')
      .values([
        { id: 'GUEST' },
        { id: 'MODERATOR' },
        { id: 'ADMINISTRATOR' },
        { id: 'STANDARD' },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'user',
        schema: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
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
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'user_role',
            type: 'varchar',
            foreignKeyConstraintName: 'action_fk',
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

    await queryRunner.createForeignKey(
      'user.user',
      new TableForeignKey({
        columnNames: ['user_role'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user.user_roles',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('user', true, true);
  }
}
