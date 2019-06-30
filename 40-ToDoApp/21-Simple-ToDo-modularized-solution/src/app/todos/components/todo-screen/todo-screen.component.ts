import { Component, OnInit } from '@angular/core';
import {ToDo} from '../../model/todo.model';
import {ToDoService} from '../../model/todo.service';

@Component({
  templateUrl: './todo-screen.component.html',
  providers: [ToDoService]
})
export class TodoScreenComponent implements OnInit {

  todos: ToDo[] = [];
  doneToDos: ToDo[] = [];

  constructor(private todoService: ToDoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  onAddToDo(todo: ToDo) {
    this.todos.push(todo); // optimistic ui
    this.todoService.saveTodo(todo)
      .subscribe(
        persistedTodo => todo.id = persistedTodo.id,
        this.handleError
      );
  }

  completeToDo(todo: ToDo) {
    todo.completed = true;
    this.todoService.updateTodo(todo)
      .subscribe(
        () => this.loadTodos(), // pessimistic ui
        this.handleError
      );
  }

  private loadTodos() {
    return this.todoService.getTodos()
      .subscribe(
        todos => {
          this.todos = todos.filter(t => !t.completed);
          this.doneToDos = todos.filter(t => t.completed);
        }
      );
  }


  private handleError(error) {
    const errMsg = error.message || 'Error calling server';
    console.error(errMsg);
    alert('Error: Calling the server failed!');
    window.location.reload();
  }
}
