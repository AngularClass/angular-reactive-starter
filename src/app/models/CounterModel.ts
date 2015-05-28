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
    @Inject(CounterIntent) intent, @Inject('state') state) {
    console.log('MODEL');
    this._state  = state;

    var {
      incrementCounterSubject
    } = intent.subjects;

    incrementCounterSubject.observer({
      next: this.incrementCounter.bind(this)
    });

    this.subject.next(this._state);
  }

  incrementCounter() {
    var counter = this._state.counter;
    this._state = Object.assign({}, this._state, {
      counter: counter + 1
    });

    this.subject.next(this._state);
  }
}

export var counterInjectables = [
  bind('state').toValue(_initialState),
  CounterIntent,
  CounterModel
];
