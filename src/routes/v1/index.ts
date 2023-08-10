import swaggerRoutes from './swagger.routes';
import { GenericRouter } from 'utils';
import AuthRoutes from './auth.routes';

export default class RoutesV1 extends GenericRouter {
  constructor() {
    super();

    this.routes();
  }

  routes() {
    this.express.use('/api-docs', new swaggerRoutes().express);
    this.express.use('/auth', new AuthRoutes().express);
  }
}
