import autobind from 'autobind-decorator';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerConfig } from 'configurations';
import { GenericRouter } from 'utils';

export default class SwaggerRoutes extends GenericRouter {
  constructor() {
    super();

    this.routes();
    this.log(SwaggerRoutes.name);
  }

  @autobind
  routes() {
    const swaggerSpecs = swaggerJsdoc({
      definition: swaggerConfig,
      apis: []
    });

    this.express.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));
  }
}
