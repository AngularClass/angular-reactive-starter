/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_typings/ng2.d.ts" />
import {ShadowDomStrategy, NativeShadowDomStrategy} from 'angular2/core';
import {bind} from 'angular2/di';
import {document} from 'angular2/src/facade/browser';

export var hasShadowDom = Boolean(document && document.body && document.body.createShadowRoot);

export var shadowDomInjectables = (!hasShadowDom) ? [] : [
  bind(ShadowDomStrategy).toClass(NativeShadowDomStrategy)
]
