/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_typings/ng2.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {ChangeDetection, JitChangeDetection} from 'angular2/change_detection'

// include any injectables
import {routerInjectables} from 'angular2/router';
import {shadowDomInjectables} from '../common/shadowDomInjectables';
import {rxPipeRegistry} from '../common/rxPipes';

// Our injectables Services
// import {appServicesInjectables} from './services/services';
// Top level component to bootstrap
import {modelInjectables} from './models/models';
import {App} from './components/app';

// bootstrap the Angular app with bindings
bootstrap(App, [
  bind('initilAppState').toValue({}), // initial state that could be server rendered
  // define any componentInjectableBindings
  routerInjectables,
  // if we want to use ShadowDom
  // shadowDomInjectables,
  // our servies
  // appServicesInjectables,
  modelInjectables,
  rxPipeRegistry,
  bind(ChangeDetection).toClass(JitChangeDetection)
]);
