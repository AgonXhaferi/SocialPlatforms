import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ChatInit1720719726000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('chat');

    await queryRunner.createTable(
      new Table({
        name: 'chat',
        schema: 'chat',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'user1_id',
            type: 'uuid',
          },
          {
            name: 'user2_id',
            type: 'uuid',
          },
          {
            name: 'time_created',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'message',
        schema: 'chat',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'chat_id',
            type: 'uuid',
          },
          {
            name: 'sender_id',
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'timestamp',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('chat.chat', [
      new TableForeignKey({
        name: 'chat_user1_fk',
        columnNames: ['user1_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user.user',
      }),
      new TableForeignKey({
        name: 'chat_user2_fk',
        columnNames: ['user2_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user.user',
      }),
    ]);

    await queryRunner.createForeignKey(
      'chat.message',
      new TableForeignKey({
        name: 'chat_user_sender_fk',
        columnNames: ['sender_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user.user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('chat.chat');
  }
}
