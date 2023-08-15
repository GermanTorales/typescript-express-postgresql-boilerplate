import express from 'express';
import helmet from 'helmet';

import { envVars, morgan, typeormConnection, logger, corsConfig } from 'configurations';
import Routes from 'routes';
import { errorHandler } from 'middlewares';

export default class App {
  public express: express.Application;
  private environment: string;

  constructor() {
    this.express = express();
    this.environment = envVars.env;
  }

  async bootstrap() {
    this.middlewares();
    await this.database();
    this.routes();
  }

  middlewares() {
    if (this.environment !== 'test') {
      this.express.use(morgan.successHandler);
      this.express.use(morgan.errorHandler);
    }

    this.express.use(helmet());
    this.express.use(corsConfig());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.disable('x-powered-by');
  }

  routes() {
    const routes = new Routes();

    this.express.use('/api', routes.setRoutes());
    this.express.use(errorHandler);
  }

  async database() {
    try {
      await typeormConnection.initialize();

      logger.info('Database connected');
    } catch (error) {
      logger.error('Database connection error: ', error);

      process.exit(1);
    }
  }
}
