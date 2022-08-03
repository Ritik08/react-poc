import {RouterStore, createRouterState} from 'mobx-state-router';
import {routes} from './routes';

const notFound = createRouterState('notFound');

export class RootStore {
    routerStore: any = new RouterStore(routes, notFound);
}
