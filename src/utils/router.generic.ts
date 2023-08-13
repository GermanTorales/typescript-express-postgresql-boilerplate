import express from 'express';
import { logger } from 'configurations';

export class GenericRouter {
  public express: express.Application;

  constructor() {
    this.express = express();
  }

  log(name: string): void {
    logger.info(`Load | ${name}`);
  }
}
