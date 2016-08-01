import { bootstrap } from '@angular/platform-browser-dynamic';

// add in ./browser-module
import browserModule from './browser-module';

// Angular 2
export function main() {
  return bootstrap(browserModule.entryComponent, browserModule.providers);
}























// Hot Module Replacement

export function bootstrapDomReady() {
  // bootstrap after document is ready
  document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV && HMR) {
  // activate hot module reload
  if (document.readyState === 'complete') {
    main();
  } else {
    bootstrapDomReady();
  }
  module.hot.accept();
} else {
  bootstrapDomReady();
}
