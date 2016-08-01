import { provideRouter, Route } from '@angular/router';

import { Home, Yolo } from './home';

type Path = "full" | "prefix";
const [full, prefix]: Path[] = ['full', 'prefix'];

export const ROUTES = [
  { path: '', component: Home, pathMatch: full},
  { path: 'about', component: './about#About'},
  { path: 'yolo', component: Yolo}
]



export const ROUTE_PROVIDERS = [
  provideRouter(ROUTES)

];
