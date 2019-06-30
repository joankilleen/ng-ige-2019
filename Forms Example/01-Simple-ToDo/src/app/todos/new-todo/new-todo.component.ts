import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {
  newToDoTitle = '';
  constructor() { }
  @Output() additem = new EventEmitter();

  ngOnInit() {
  }

  addToDo(){
    this.additem.emit(this.newToDoTitle);
    this.newToDoTitle = '';

  }

}
