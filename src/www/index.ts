import http from 'http';
import { AddressInfo } from 'net';

import App from '../app';
import { envVars, logger } from 'configurations';

class Server {
  private application: App;
  private port: number;
  private host: string;

  constructor() {
    this.application = new App();
    this.port = envVars.port;
    this.host = envVars.host;

    this.bootstrap();
  }

  bootstrap() {
    const server = http.createServer(this.application.express).listen({ port: this.port, host: this.host }, () => {
      const addressInfo = server.address() as AddressInfo;

      logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);
    });

    const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

    signalTraps.forEach((type) => {
      process.once(type, async () => {
        logger.info(`process.once ${type}`);

        server.close(() => console.log(`Server closed`));
      });
    });
  }
}

new Server();
