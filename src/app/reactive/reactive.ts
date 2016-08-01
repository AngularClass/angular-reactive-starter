import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ObserveViewChild }  from '@angularclass/observe-decorators';
import { Observable } from 'rxjs/Rx'

//normal component with @Output event
@Component({
  selector: 'incrementer',
  template: `
  <div>
    <button (click)="increments.emit(1)">increment</button>
  </div>`
})
class Incrementer {
  @Output() increments = new EventEmitter();
}


@Component({
  selector: 'angularclass-app',
  directives: [
    Incrementer
  ],
  template: `
    <div>
      <h4>Child Total Count: {{ counterChange | async }}</h4>
      <incrementer></incrementer>
      <button #decrement>decrement</button>
    </div>
  `,
})
export class AngularclassApp {
  //query and listen to component output
  @ObserveViewChild(Incrementer) increments = new EventEmitter<number>();

  //query and listen to a DOM element
  @ObserveViewChild('decrement', 'click') decrements = new EventEmitter();


  // Notice how we're able to just return an Observable
  @Output() counterChange = Observable.merge(
    this.increments,
    this.decrements.mapTo(-1)
  )
  .startWith(0)
  .scan((total: number, value: number) => total + value, 0);

}

@Component({
  selector: 'ac-app',
  directives: [
    AngularclassApp
  ],
  template: `
    <div>
      <h3>Parent Total Count: {{ counter }}</h3>
      <angularclass-app [yolo]="initialValue" [(counter)]="counter"></angularclass-app>
    </div>
  `
})
export class AcApp {
  initialValue = 90;
  @Input() counter  = 50;
  // we can abuse everything to get what we want
  @Output() @ObserveViewChild(AngularclassApp) counterChange = new EventEmitter();

  ngOnInit() {

  }

}

@Component({
  selector: 'app',
  directives: [AcApp],
  template: `
    <div>
      <h2>Root Total Count: {{ counter }}</h2>
      <ac-app (counterChange)="counter = $event"></ac-app>
    </div>
  `
})
export class App {
  counter = 0;
  // who needs |async
  ngOnInit() {
    // where are all of my subscribes? ;)
  }

}

@Component({
  directives: [
    App
  ],
  template: `
    <div>
      Reactive
      <app></app>
    </div>
  `
})
export class Reactive {

}
