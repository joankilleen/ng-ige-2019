import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ToDo} from '../../model/todo.model';

@Component({
  selector: 'td-new-todo',
  templateUrl: './new-todo.component.html',
})
export class NewTodoComponent {

  newToDoTitle = '';
  @Output() addToDo = new EventEmitter<ToDo>();

  onAddToDo(): void {
    this.addToDo.emit(new ToDo(this.newToDoTitle));
    this.newToDoTitle = '';
  }

}



// DEMO:
//
// Inject the form:
// @ViewChild('formRef') formRef;
//
// Set the value programmatically
// this.formRef.controls['newToDoTitle'].setValue('New ToDo');
