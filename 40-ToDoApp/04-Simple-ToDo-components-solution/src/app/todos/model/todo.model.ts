export class ToDo {

  private _title: string; // tslint:disable-line
  completed = false;

  constructor(title = '') {
    this.title = title.trim();
  }

  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value.trim();
  }
}
