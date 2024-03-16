import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class MainInit1707168679757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('culture');
    await queryRunner.createSchema('user');

    await queryRunner.createTable(
      new Table({
        name: 'culture',
        schema: 'culture',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'location',
            type: 'varchar',
          },
          {
            name: 'language',
            type: 'varchar',
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

    await queryRunner.createTable(
      new Table({
        name: 'culture_subscriptions',
        schema: 'culture',
        columns: [
          {
            name: 'culture_id',
            type: 'varchar',
            isPrimary: true,
            foreignKeyConstraintName: 'subscription_culture_fk',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
            foreignKeyConstraintName: 'subscription_user_fk',
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
            foreignKeyConstraintName: 'user_role_fk',
          },
          {
            name: 'primary_culture',
            type: 'varchar',
            foreignKeyConstraintName: 'culture_fk',
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
        name: 'user_role_fk',
        columnNames: ['user_role'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user.user_roles',
      }),
    );

    await queryRunner.createForeignKey(
      'user.user',
      new TableForeignKey({
        name: 'culture_fk',
        columnNames: ['primary_culture'],
        referencedColumnNames: ['name'],
        referencedTableName: 'culture.culture',
      }),
    );

    await queryRunner.createForeignKey(
      'culture.culture_subscriptions',
      new TableForeignKey({
        name: 'subscription_culture_fk',
        columnNames: ['culture_id'],
        referencedColumnNames: ['name'],
        referencedTableName: 'culture.culture',
      }),
    );

    await queryRunner.createForeignKey(
      'culture.culture_subscriptions',
      new TableForeignKey({
        name: 'subscription_user_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user.user',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'culture_articles',
        schema: 'culture',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'gen_random_uuid()',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
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

    await queryRunner.createTable(
      new Table({
        name: 'culture_events',
        schema: 'culture',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'gen_random_uuid()',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'longitude',
            type: 'decimal(10,8)',
          },
          {
            name: 'latitude',
            type: 'decimal(10,8)',
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
            isNullable: false,
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
    await queryRunner.dropSchema('culture', true, true);

    await queryRunner.dropSchema('user', true, true);
  }
}