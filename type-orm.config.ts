import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { MainInit1707168679757 } from './migrations/1707168679757-init';
import { ChatInit1720719726000 } from './migrations/1720719726000-chatInit';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow<string>('DATABASE_URL'),
  entities: [],
  migrations: [MainInit1707168679757, ChatInit1720719726000],
});
