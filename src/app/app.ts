import { Component } from '@angular/core';
import { AppStore } from './app-store';

@Component({})
export class App {
  constructor(public appStore: AppStore) {
    console.log('Hello Angular 2 Webpack 2');
  }
}

