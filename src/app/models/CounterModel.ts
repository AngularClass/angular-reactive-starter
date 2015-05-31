import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Inject, Injectable} from 'angular2/di';

import {CounterIntent} from '../intents/CounterIntent';

interface IState {
  counter: number
}

var _initialState:IState = {
  counter: 0
};


interface IObservable {
  next(val:any)
  return(val:any)
  throw(val:any)
  observer(generator: any): Observable;
}

@Injectable()
export class CounterModel {
  public  subject: Observable = new EventEmitter();
  private _state: IState;
  constructor(
    @Inject(CounterIntent) intent, @Inject('counterState') state) {
    console.log('CounterMODEL');
    this._state  = state;

    var {
      incrementCounterSubject
    } = intent.subjects;

    incrementCounterSubject.observer({
      next: this.incrementCounter.bind(this)
    });

  }

  incrementCounter() {
    var counter = this._state.counter;
    var state = Object.assign({}, this._state, {
      counter: counter + 1
    });
    this._state = state;
    this.subject.next(state);
  }
}

export var counterInjectables = [
  bind('counterState').toValue(_initialState),
  CounterIntent,
  CounterModel
];
