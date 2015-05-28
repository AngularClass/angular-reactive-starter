import {bind, Inject} from 'angular2/di';
import {Observable, EventEmitter} from 'angular2/src/facade/async';
import {Map} from 'immutable';

// Using TypeScript we can define our state interface
// interface IObservable {
//   next(val:any);
//   return(val:any);
//   throw(val:any);
//   observer(generator: any): Observable;
// }
// interface ITodo {
//   value: string;
//   created_at: Date;
//   completed?: boolean;
// }
// interface ITodoState {
//   todos: Array<ITodo>
// }

// // We can also make a TodoStore to manage cache/localStorage
// let _todoState:ITodoState = {
//   todos: [
//     { value:'finish example', created_at: new Date() },
//     { value:'add tests',      created_at: new Date() }
//   ]
// };

// // Our Todo Service
// export class TodoService implements IObservable {
//   private _state: ITodoState; // we shouldn't access .state directly
//   private observer: Observable = new EventEmitter();

//   constructor(@Inject('todoState') state) {
//     this.observer
//   }

//   observer() { return this._observer; }
//   next(value) { this._observer.next(value); }
//   throw(error) { this._observer.throw(error); }
//   return (value) { this._observer.return(value); }

//   add(todo) {
//     // Async call to server then save state
//     this.observer().next({
//       value: todo,
//       created_at: new Date()
//     });
//   }

//   remove(index) {
//     // Async call to server then save state
//     this.observer().todos.splice(index, 1);
//   }

// }//TodoService

// export const todoInjectables = [
//   bind('todoState').toValue(_todoState),
//   bind(TodoService).toClass(TodoService)
// ];
