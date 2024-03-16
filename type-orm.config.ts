import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { MainInit1707168679757 } from './migrations/1707168679757-init';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow<string>('DATABASE_URL'),
  entities: [],
  migrations: [MainInit1707168679757],
});
