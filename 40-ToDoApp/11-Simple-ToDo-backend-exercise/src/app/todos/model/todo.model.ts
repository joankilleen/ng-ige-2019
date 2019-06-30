import { ToDoData } from './todo.service';

export class ToDo {
  private _title: string; //tslint:disable-line
  completed = false;

  constructor(title: string = '') {
    this.title = title.trim();
  }

  static createFromJson(jsonData: ToDoData): ToDo {
    const newToDo = new ToDo();
    return Object.assign(newToDo, jsonData);
  }

  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value.trim();
  }
}
