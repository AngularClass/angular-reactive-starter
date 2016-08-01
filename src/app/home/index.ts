import {exportNgModules} from '../_helpers/ng-module';

import {Home} from './home';

export * from './home';
export default exportNgModules({
  entryComponent: Home,
  routes: [],
  directives: [],
  providers: [],
  pipes: []
});
