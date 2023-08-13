import routerV1 from './v1';
import { GenericRouter } from 'utils';

export default class Routes extends GenericRouter {
  constructor() {
    super();
  }

  setRoutes() {
    const v1Routes = new routerV1();

    this.express.use('/v1', v1Routes.setRoutes());

    return this.express;
  }
}
