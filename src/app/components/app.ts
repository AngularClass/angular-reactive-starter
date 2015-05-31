/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View, coreDirectives, onChange, ON_PUSH} from 'angular2/angular2';
import {Observable} from 'angular2/src/facade/async';
import {Inject} from 'angular2/di'
import {RouteConfig, Router, RouterOutlet, RouterLink} from 'angular2/router';
var routerDirectives = [RouterOutlet, RouterLink];
import {BrowserLocation} from 'angular2/src/router/browser_location';
import * as Rx from 'rx';

// A simple example of a Component using a Service
// import {Todo} from './todo';

// Import all of our custom app directives
// import {appDirectives} from '../directives/directives';

import {CounterIntent} from '../intents/CounterIntent';
import {CounterModel} from '../models/CounterModel';

import {GreetIntent} from '../intents/GreetIntent';
import {GreetModel} from '../models/GreetModel';


@Component({
  selector: 'count',
  lifecycle: [onChange],
  // changeDetection: ON_PUSH,
  properties: { 'counter': 'counter' }
})
@View({
  template: `
  <div>
    counter {{ counter }}

    <div>
      <button (click)="incrementCounter()">
        Increment Counter from Component
      </button>
      <content></content>
    </div>

  </div>
  `
})
export class Count {
  counter: number = 0;
  constructor(public counterIntent: CounterIntent) {
  }

  incrementCounter() {
    this.counterIntent.incrementCounter();
  }

  onChange(value) {
    console.log('CHANGE Count','\n', JSON.stringify(value, null, 2));
  }
}



@Component({
  selector: 'app',
  lifecycle: [onChange],
  // changeDetection: ON_PUSH
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ routerDirectives, coreDirectives, Count ],
  template: `

  <h1 class="title">Hello Reactive Angular 2</h1>

  <count [counter]="appState | async | get('counter')">
    <button (click)="handleIncrement()">Increment Counter from App</button>
  </count>

  <h2>Greet {{ appState | async | get('greeting') }}</h2>
  <div>
    <button (^click)="toggleGreet()">Greet {{ appState | async | get('greeting') }} </button>
  </div>
  <pre>appState = {{ appState | async | json }}</pre>
  `
})
export class App {
  appState: Rx.Observable<Object>;
  constructor(
    counter: CounterModel,
    public counterIntent: CounterIntent,
    greet: GreetModel,
    public greetIntent: GreetIntent,
    @Inject('initilAppState') initilAppState
  ) {

    this.appState = Rx.Observable.return(initilAppState).combineLatest(
      counter.subject,
      greet.subject,
      (...args) => Object.assign({}, ...args)
    );

  }
  handleIncrement() {
    this.counterIntent.incrementCounter();
  }
  toggleGreet() {
    this.greetIntent.toggleGreet();
  }

  onChange(value) {
    console.log('CHANGE App', '\n', JSON.stringify(value, null, 2));
  }

}
