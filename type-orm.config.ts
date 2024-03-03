import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { InitUser1707168679757 } from './migrations/1707168679757-init_user';
import { InitCulture1709470247731 } from './migrations/1709470247731-init_culture';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow<string>('DATABASE_URL'),
  entities: [],
  migrations: [InitUser1707168679757, InitCulture1709470247731],
});
