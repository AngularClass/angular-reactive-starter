import {exportNgModules} from './_helpers/ng-module';

import aboutModule from './about';
import homeModule from './home';
import reactiveModule from './reactive';

import { App } from './app';
import { AppStore } from './app-store';
import { ROUTES, ROUTE_PROVIDERS } from './routes';

export * from './app';
export * from './routes';
export default exportNgModules({
  entryComponent: App,
  ngModules: [
    aboutModule,
    homeModule,
    reactiveModule
  ],
  routes: [
    ...ROUTES
  ],
  directives: [],
  providers: [
    ...ROUTE_PROVIDERS,
    AppStore
  ],
  pipes: []
});






