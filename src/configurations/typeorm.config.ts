require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import envVars from './environment-variables.config';
import { User } from 'entities';

const typeormConnection = new DataSource({
  host: envVars.postgres.host,
  port: envVars.postgres.port,
  username: envVars.postgres.username,
  password: envVars.postgres.password,
  database: envVars.postgres.database,
  type: 'postgres',
  synchronize: envVars.postgres.synchronize,
  logging: envVars.postgres.logging ? ['error'] : false,
  entities: [User],
  migrations: ['migrations/**/*{.ts,.js}'],
  subscribers: ['subscribers/**/*{.ts,.js}']
});

export default typeormConnection;
