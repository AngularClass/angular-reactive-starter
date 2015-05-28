/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View, coreDirectives, onChange, ON_PUSH} from 'angular2/angular2';
import {Observable} from 'angular2/src/facade/async';
import {RouteConfig, Router, RouterOutlet, RouterLink} from 'angular2/router';
var routerDirectives = [RouterOutlet, RouterLink];
import {BrowserLocation} from 'angular2/src/router/browser_location';

// A simple example of a Component using a Service
// import {Todo} from './todo';

// Import all of our custom app directives
// import {appDirectives} from '../directives/directives';

import {CounterIntent} from '../intents/CounterIntent';
import {CounterModel} from '../models/CounterModel';


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

  onChange(wat) {
    console.log('CHANGE', wat);
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
  directives: [ routerDirectives, Count ],
  template: `

  <h1 class="title">Hello {{ name }}</h1>


  <count [counter]="state.counter"></count>
  <button (click)="handleIncrement()">Increment Counter from App</button>



  <pre>AppState = {{ model.subject | async | json }}</pre>
  `
})
export class App {
  name: string;
  state: Object;
              model: CounterModel; counterIntent: CounterIntent;
  constructor(model: CounterModel, counterIntent: CounterIntent) {
               this.model = model; this.counterIntent = counterIntent;

    this.name = 'Angular 2';
    this.state = { counter: 0 };

    this.model.subject.observer({ next: (state) => this.state = state });

    // var AppObservable = Rx.Observable.combineLatest([
    //     Counter.subject,
    //     OtherModel.subject
    //   ],
    //   (Counter, OtherModel) => {
    //     return { Counter, OtherModel
    //     };
    //   }
    // );
  }
  handleIncrement() {
    this.counterIntent.incrementCounter();
  }
  onChange(wat) {
    console.log('CHANGE TOP', wat);
  }
}



