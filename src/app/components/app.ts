/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View, coreDirectives, onChange, ON_PUSH} from 'angular2/angular2';
import {Observable} from 'angular2/src/facade/async';
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
  changeDetection: ON_PUSH,
  properties: {
    'counter': 'counter'
  }
})
@View({
  template: `
    counter {{ counter }}
    <button (click)="incrementCounter()">Increment Counter from Component</button>
  `
})
export class Count {
  counterIntent: CounterIntent;
  constructor(counterIntent: CounterIntent) {
    this.counterIntent = counterIntent;
  }

  onChange(value) {
    console.log('CHANGE Count', value);
  }
  incrementCounter() {
    this.counterIntent.incrementCounter();
  }
}


// App: Top Level Component
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly,
  lifecycle: [onChange]
  // changeDetection: ON_PUSH
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ routerDirectives, coreDirectives, Count ],
  template: `

  <h1 class="title">{{ state.greeting }}</h1>


  <count [counter]="state.counter"></count>
  <button (click)="handleIncrement()">Increment Counter from App</button>

  <h2>Greet {{ state.greeting }}</h2>
  <div>
    <button (^click)="toggleGreet()">Greet {{ state.greeting }} </button>
  </div>
  <pre>AppState = {{ state | json }}</pre>
  `
})
export class App {
  state: any;
              // public isn't working for me here :/
              counter: CounterModel; counterIntent: CounterIntent;
                greet: GreetModel;     greetIntent: GreetIntent;
  constructor(counter: CounterModel, counterIntent: CounterIntent,
                greet: GreetModel,     greetIntent: GreetIntent) {
          this.counter = counter;   this.counterIntent = counterIntent;
            this.greet = greet;     this.greetIntent   = greetIntent;

    this.state = {};

    var appState = Rx.Observable.merge(
      this.counter.subject.toRx(),
      this.greet.subject.toRx()
    );


    appState.subscribe(results => {
      this.state = Object.assign({}, this.state, results)
    });

  }
  handleIncrement() {
    console.log('CHANGE App');
    this.counterIntent.incrementCounter();
  }
  toggleGreet() {
    console.log('CHANGE App');
    this.greetIntent.toggleGreet();
  }
  // doesn't work at the moment
  onChange(value) {
    console.log('CHANGE App', value);
  }
}



