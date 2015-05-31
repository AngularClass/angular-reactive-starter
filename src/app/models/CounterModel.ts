// import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Inject, Injectable} from 'angular2/di';
import * as Rx from 'rx';
var {Observable, ReplaySubject} = Rx;

import {CounterIntent} from '../intents/CounterIntent';

interface IState {
  counter: number
}

var _initialState:IState = {
  counter: 0
};


@Injectable()
export class CounterModel {
  public  subject: any = new ReplaySubject(1);
  private _state: IState;
  constructor(
    @Inject(CounterIntent) intent,
    @Inject('counterState') state) {

    console.log('CounterMODEL');
    this._state = state;

    var {incrementCounterSubject} = intent.subjects;

    incrementCounterSubject.observer({
      next: this.incrementCounter.bind(this)
    });

    this.subject.onNext(state);
  }

  incrementCounter() {
    var counter = this._state.counter;
    var state = Object.assign({}, this._state, {
      counter: counter + 1
    });
    this._state = state; // store prevous state until I find a better way
    this.subject.onNext(state);
  }
}

export var counterInjectables = [
  bind('counterState').toValue(_initialState),
  CounterIntent,
  CounterModel
];
