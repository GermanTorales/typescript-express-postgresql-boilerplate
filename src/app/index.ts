import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { envVars, morgan } from 'configurations';
import Routes from 'routes';

export default class App {
  public express: express.Application;
  private environment: string;

  constructor() {
    this.express = express();
    this.environment = envVars.env;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    if (this.environment !== 'test') {
      this.express.use(morgan.successHandler);
      this.express.use(morgan.errorHandler);
    }

    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.disable('x-powered-by');
  }

  routes() {
    const routes = new Routes();
    this.express.use('/api', routes.express);
  }
}
