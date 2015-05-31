import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Inject, Injectable} from 'angular2/di';

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
  public  subject: Observable = new EventEmitter();
  private _state: IState;
  constructor(
    @Inject(GreetIntent) intent, @Inject('greetState') state) {
    console.log('GreetMODEL');
    this._state  = state;

    var {
      toggleGreetSubject
    } = intent.subjects;

    toggleGreetSubject.observer({
      next: this.toggleGreet.bind(this)
    });

  }

  toggleGreet() {
    var greet = this._state.greeting;
    var state = Object.assign({}, this._state, {
      greeting: greet === greet1 ? greet2 : greet1
    });
    this._state = state;
    this.subject.next(state);
  }
}

export var greetInjectables = [
  bind('greetState').toValue(_initialState),
  GreetIntent,
  GreetModel
];
