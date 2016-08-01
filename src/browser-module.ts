import { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';
import { SystemJsComponentResolver, ComponentResolver } from '@angular/core';

// our App
import appModule from './app';


// providers
const providers = [
  {
    provide: ComponentResolver,
    useFactory: (r) => new SystemJsComponentResolver(r),
    deps: [RuntimeCompiler]
  },

  ...appModule.providers
];

// pipes
const pipes = [

  ...appModule.pipes
];

// directives
import { ROUTER_DIRECTIVES } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

const directives = [
  ...ROUTER_DIRECTIVES,
  ...REACTIVE_FORM_DIRECTIVES,

  ...appModule.ngModules.map(ngModule => ngModule.entryComponent),

  ...appModule.directives
];


// module
export default {
  entryComponent: appModule.entryComponent,
  providers: [
    ...providers,
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: directives},
    { provide: PLATFORM_PIPES, multi: true, useValue: pipes}
  ],
};
