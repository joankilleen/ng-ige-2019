import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ToDo} from '../../model/todo.model';
import {ToDoService} from '../../model/todo.service';

@Component({
  templateUrl: './todo-screen.component.html',
})
export class TodoScreenComponent implements OnInit {

  loading = false;
  todos: ToDo[] = [];

  constructor(private todoService: ToDoService) {
  }

  ngOnInit() {
    this.loadToDos();
  }

  addToDo(todo: ToDo) {
    // TODO: Part of the exercise
    console.log('Not yet implemented ...');
  }

  completeToDo(todo: ToDo) {
    // TODO: Part of the exercise
    console.log('Not yet implemented ...');
  }

  private loadToDos() {
    this.loading = true;
    this.todoService.getTodos(false)
      .subscribe(
        todos => {
          this.todos = todos;
          this.loading = false;
        }
      );
  }
}
