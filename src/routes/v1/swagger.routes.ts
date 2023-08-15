/* Dependencies imports */
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/* Internal modules imports */
import { envVars } from 'configurations';
import { GenericRouter } from 'utils';

export class SwaggerRoutes extends GenericRouter {
  constructor() {
    super();

    this.log(SwaggerRoutes.name);
  }

  setRoutes() {
    const swaggerSpecs = swaggerJsdoc({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'node-express-typescript-boilerplate API documentation',
          version: '0.0.1',
          description: 'This is a node express boilerplate in typescript',
          license: {
            name: 'MIT',
            url: ''
          }
        },
        servers: [
          {
            url: `http://localhost:${envVars.port}/api/v1`,
            description: 'Local Server'
          }
        ]
      },
      apis: ['schemas/*.yaml', '**/*.docs.yaml']
    });

    this.express.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

    return this.express;
  }
}
