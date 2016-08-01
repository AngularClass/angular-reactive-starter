import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
  // include your state here
  counter: number;
}

const defaultState = {
  // include your initial state here
  counter: 0
}

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class AppStore {
  private _store = _store;
  changes = this._store
    .asObservable()
    .distinctUntilChanged()

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._clone(this._store.value);
  }

  getValue(prop?: string): any {
    var state = this._clone(this._store.value);
    return prop ? state[prop] : state;
  }

  setValue(prop?: string, value?: any): any {
    var state = this._clone(this._store.value);
    state[prop] = value;
    this._store.next(state);
  }

  purge() {
    this._store.next(defaultState);
  }

  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  toJSON() {
    return this._store.value;
  }
}
