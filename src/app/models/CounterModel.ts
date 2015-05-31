// import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Inject, Injectable} from 'angular2/di';
import * as Rx from 'rx';

import {CounterIntent} from '../intents/CounterIntent';

interface IState {
  counter: number
}

var _initialState:IState = {
  counter: 0
};


@Injectable()
export class CounterModel {
  subject: Rx.BehaviorSubject<IState>;
  private _state: IState;
  constructor(
    @Inject(CounterIntent) intent,
    @Inject('counterState') state) {
    this._state = state;

    this.subject = new Rx.BehaviorSubject(this._state);

    console.log('CounterMODEL');

    var {incrementCounterSubject} = intent.subjects;

    incrementCounterSubject.observer({
      next: this.incrementCounter.bind(this)
    });

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
