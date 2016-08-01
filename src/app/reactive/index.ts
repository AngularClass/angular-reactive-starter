import {exportNgModules} from '../_helpers/ng-module';

import {Reactive} from './reactive';

export * from './reactive';
export default exportNgModules({
  entryComponent: Reactive,
  routes: [],
  directives: [

  ],
  providers: [],
  pipes: []
});
