import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ObserveViewChild }  from '@angularclass/observe-decorators';
import { Observable } from 'rxjs/Rx'

import { AppStore } from '../app-store';

//normal component with @Output event
@Component({
  template: `
  <div>
    <button (click)="increments.emit(1)">increment</button>
  </div>`
})
export class Incrementer {
  @Output() increments = new EventEmitter();
}


@Component({
  template: `
    <div>
      <h4>Child Total Count: {{ appStore.changes.pluck('counter') | async }}</h4>
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

  constructor(public appStore: AppStore) {

  }

}

@Component({
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


}

@Component({
  template: `
    <div>
      <h2>Root Total Count: {{ counter }}</h2>
      <ac-app></ac-app>
    </div>
  `
})
export class ReactiveApp {
  get counter() {
    return this.appStore.getValue('counter');
  }

  @ObserveViewChild(AcApp) counterChange = new EventEmitter();

  constructor(public appStore: AppStore) {


    this.counterChange.subscribe(data => this.appStore.setValue('counter', data));
  }

}
