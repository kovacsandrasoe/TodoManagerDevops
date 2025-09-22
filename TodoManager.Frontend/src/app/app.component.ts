import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoCreateDto } from './todo-create-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  actual: TodoCreateDto = new TodoCreateDto();
  constructor(public service: TodoService) { }

  create(){
    this.service.create(this.actual).subscribe(t => {
      this.actual = new TodoCreateDto();
    })
  }

}
