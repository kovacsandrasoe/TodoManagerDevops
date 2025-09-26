import { Component } from '@angular/core';
import { TodoCreateDto } from '../todo-create-dto';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(public service: TodoService) { }
}
