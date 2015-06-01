import {PipeFactory} from 'angular2/src/change_detection/pipes/pipe';
import {async} from 'angular2/src/change_detection/change_detection';
import {NullPipeFactory, Pipe, PipeRegistry, defaultPipes} from 'angular2/change_detection';
import {bind} from 'angular2/di';
import {ObservablePipe} from 'angular2/pipes';
import * as Rx from 'rx';

export function isObservable(obs) {
  return obs && typeof obs.subscribe === 'function';
}

export class RxPipe extends ObservablePipe {
  _subscription: any;
  _observable: any;
  constructor(ref) { super(ref); }
  supports(obs) { return isObservable(obs); }
  _subscribe(obs) {
    this._observable = obs;
    this._subscription = obs.subscribe(
      value => this._updateLatestValue(value),
      e => { throw e; }
    );
  }
}

export class RxPipeFactory extends PipeFactory {
  constructor() { super(); }
  supports(obs) { return isObservable(obs); }
  create(cdRef): Pipe { return new RxPipe(cdRef); }
}

export var rxAsync = [ new RxPipeFactory() ].concat(async);

export class GetPipe extends Pipe {
  onDestroy() {}
  supports(val) { return true }
  transform(val) {
    return function getProp(prop) {
      return (val) ? val[prop] : val;
    }
  }
}

export class GetPipeFactory extends PipeFactory {
  constructor() { super(); }
  supports(val) { return true }
  create(ref: any): Pipe { return new GetPipe(); }
}

export var get = [ new GetPipeFactory(), new NullPipeFactory() ];


export var rxPipes = Object.assign({}, defaultPipes, {
  'async': rxAsync,
  'get': get
});

export var rxPipeRegistry = [
  bind(PipeRegistry).toValue(new PipeRegistry(rxPipes))
];
