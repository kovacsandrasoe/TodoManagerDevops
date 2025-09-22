import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from './todo';
import { TodoCreateDto } from './todo-create-dto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Observable<Todo[]>;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.todos = http.get<Todo[]>(this.configService.cfg.backendUrl + '/todo');
  }

  delete(id: string){
    return this.http.delete(this.configService.cfg.backendUrl + '/todo/' + id).pipe(tap(t => {
      this.todos = this.http.get<Todo[]>(this.configService.cfg.backendUrl + '/todo');
    }));
  }

  create(t: TodoCreateDto){
    return this.http.post<Todo>(this.configService.cfg.backendUrl + '/todo', t).pipe(tap(t => {
      this.todos = this.http.get<Todo[]>(this.configService.cfg.backendUrl + '/todo');
    }));
  }


}
