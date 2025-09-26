import { Component } from '@angular/core';
import { TodoCreateDto } from '../todo-create-dto';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  actual: TodoCreateDto = new TodoCreateDto();
  constructor(public service: TodoService, private router: Router) { }

  create(){
    this.service.create(this.actual).subscribe(t => {
      this.actual = new TodoCreateDto();
      this.router.navigate(['list']);
    })
  }
}
