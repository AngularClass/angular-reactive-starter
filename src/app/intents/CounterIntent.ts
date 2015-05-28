import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Injectable} from 'angular2/di';

interface ICounter {
  subjects: any;
  incrementCounter();
}

@Injectable()
export class CounterIntent implements ICounter {
  subjects: any = {
    incrementCounterSubject: new EventEmitter()
  }
  constructor() {
    console.log('CounterIntent');
  }

  incrementCounter() {
    this.subjects.incrementCounterSubject.next()
  }

};
