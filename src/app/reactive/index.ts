import {exportNgModules} from '../_helpers/ng-module';

import {
  ReactiveApp,
  Incrementer,
  AcApp,
  AngularclassApp,
} from './reactive';

export * from './reactive';
export default exportNgModules({
  entryComponent: ReactiveApp,
  routes: [],
  directives: [
    Incrementer,
    AngularclassApp,
    AcApp
  ],
  providers: [],
  pipes: []
});
