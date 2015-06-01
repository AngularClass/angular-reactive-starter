/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

// Angular 2
import {Directive, Component, View, coreDirectives, onChange, onDestroy, ON_PUSH, ElementRef} from 'angular2/angular2';
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


@Directive({
  selector: '[drag-element]',
  hostListeners: {
    // Observable plz
    // 'mouseup': 'onMouseup($event)',
    // 'mousedown': 'onMousedown($event)'
    // 'window:mousemove': 'onMousedown($event)'
  }
})
export class DragElement {
  mouseup:   Rx.Observable<any>;
  mousemove: Rx.Observable<any>;
  mousedown: Rx.Observable<any>;
  mousedrag: Rx.Observable<any>;
  constructor( {domElement}: ElementRef ) {

    this.mouseup = this.fromDOMSource('mouseup', domElement)
    this.mousemove = this.fromDOMSource('mousemove', window.document);
    this.mousedown = this.fromDOMSource('mousedown', domElement).
      map( event => {
        event.preventDefault();
        // calculate offsets when mouse down
        var {clientY, clientX} = event;
        return {
         left: clientX - domElement.getBoundingClientRect().left,
         top:  clientY - domElement.getBoundingClientRect().top,
        };
      });

    // Combine mouse down with mouse move until mouse up
    this.mousedrag = this.mousedown.
      selectMany( imageOffset => {
        return this.mousemove.map(  pos => {
          var {clientY, clientX} =  pos;
          var {top, left} = imageOffset;
          // calculate offsets from mouse down to mouse moves
          return {
            top:  clientY - top,
            left: clientX - left
          };
        }).takeUntil(this.mouseup);
      });
    /*
    todo: Use requestAnimationFrame Scheduler
    */
    this.mousedrag.subscribe( pos => {
      var {top, left} = pos;
      var {style}     = domElement;
      // Update position
      // requestAnimationFrame
      style.top  = top + 'px';
      style.left = left + 'px';
    });
  }

  fromDOMSource(eventName: string, el: any): Rx.Observable<any> {
    return Rx.Observable.fromEventPattern(
      callback => el.addEventListener(eventName, callback, false),
      callback => el.removeEventListener(eventName, callback)
    );
  }
}


@Component({
  selector: 'count',
  // lifecycle: [onChange],
  // changeDetection: ON_PUSH,
  properties: { 'counter': 'counter' }
})
@View({
  directives: [ ],
  template: `
  <div>
    counter {{ counter }}


    <p>
      <button (click)="incrementCounter()">
        Increment Counter from Component
      </button>
      <content></content>
    </p>

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

  // onChange(value) {
  //   console.log('CHANGE Count','\n', JSON.stringify(value, null, 2));
  // }
}



@Component({
  selector: 'app',
  // changeDetection: ON_PUSH
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ routerDirectives, coreDirectives, Count, DragElement ],
  template: `
    <style>
    [drag-element] {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      background-image: url(https://cdn.rawgit.com/Reactive-Extensions/rx.angular.js/master/examples/draganddrop/logo.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      height: 200px;
      width: 200px;
      color: #000000;
      border: 1px solid #666666;
      padding: 10px;
      position: absolute;
      cursor: move;
    }
  </style>

  <header>
    <h1 class="title">Hello Reactive Angular 2</h1>
  </header>

  <main>
    <count [counter]="appState | async | get('counter')">
      <button (click)="handleIncrement()">Increment Counter from App</button>
    </count>

    <h2>
      Greet {{ appState | async | get('greeting') }}
    </h2>

    <p>
      <button (^click)="toggleGreet()">Greet {{ appState | async | get('greeting') }} </button>
    </p>
    <p>
      <pre>appState = {{ appState | async | json }}</pre>
    </p>
  </main>

  <footer>
    <div drag-element>
      Draggable Div
    </div>
  </footer>

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

}
