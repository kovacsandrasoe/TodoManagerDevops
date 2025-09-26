import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from './todo';
import { TodoCreateDto } from './todo-create-dto';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Observable<Todo[]>;
  constructor(private http: HttpClient) {
    this.todos = http.get<Todo[]>(environment.backendUrl + '/todo');
  }

  delete(id: string){
    return this.http.delete(environment.backendUrl + '/todo/' + id).pipe(tap(t => {
      this.todos = this.http.get<Todo[]>(environment.backendUrl + '/todo');
    }));
  }

  create(t: TodoCreateDto){
    return this.http.post<Todo>(environment.backendUrl + '/todo', t).pipe(tap(t => {
      this.todos = this.http.get<Todo[]>(environment.backendUrl + '/todo');
    }));
  }


}
