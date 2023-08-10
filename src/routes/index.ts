import routerV1 from './v1';
import { GenericRouter } from 'utils';

export default class Routes extends GenericRouter {
  constructor() {
    super();

    this.routes();
  }

  routes() {
    this.express.use('/v1', new routerV1().express);
  }
}
