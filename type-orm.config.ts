import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { InitUser1707168679757 } from './migrations/1707168679757-init_user';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow<string>('DATABASE_URL'),
  entities: [],
  migrations: [InitUser1707168679757],
});
