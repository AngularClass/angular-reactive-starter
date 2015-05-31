import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {bind, Injectable} from 'angular2/di';

interface IGreet {
  subjects: any;
  toggleGreet();
}

@Injectable()
export class GreetIntent implements IGreet {
  subjects: any = {
    toggleGreetSubject: new EventEmitter()
  }
  constructor() {
    console.log('GreetIntent');
  }

  toggleGreet() {
    this.subjects.toggleGreetSubject.next()
  }

};
