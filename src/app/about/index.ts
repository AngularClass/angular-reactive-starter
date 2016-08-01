import {exportNgModules} from '../_helpers/ng-module';

import {About} from './about';

export * from './about';
export default exportNgModules({
  entryComponent: About,
  routes: [],
  directives: [],
  providers: [],
  pipes: []
});
