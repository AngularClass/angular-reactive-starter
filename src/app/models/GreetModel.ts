// import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Inject, Injectable} from 'angular2/di';
import * as Rx from 'rx';


import {GreetIntent} from '../intents/GreetIntent';

interface IState {
  greeting: string
}

var greet1 = 'Hello World';
var greet2 = 'Hello Angular 2';

var _initialState:IState = {
  greeting: greet1
};

@Injectable()
export class GreetModel {
  subject: Rx.BehaviorSubject<IState>;
  private _state: IState;
  constructor(
    @Inject(GreetIntent) intent,
    @Inject('greetState') state) {
    this._state  = state;

    this.subject = new Rx.BehaviorSubject(this._state);

    console.log('GreetMODEL');

    var {toggleGreetSubject} = intent.subjects;

    toggleGreetSubject.observer({
      next: this.toggleGreet.bind(this)
    });

  }

  toggleGreet(subject) {
    var greet = this._state.greeting;
    var state = Object.assign({}, this._state, {
      greeting: greet === greet1 ? greet2 : greet1
    });
    this._state = state; // store prevous state until I find a better way
    this.subject.onNext(state);
  }
}

export var greetInjectables = [
  bind('greetState').toValue(_initialState),
  GreetIntent,
  GreetModel
];
