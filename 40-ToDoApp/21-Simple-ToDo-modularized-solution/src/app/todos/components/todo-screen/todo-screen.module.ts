import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TodoScreenComponent} from './todo-screen.component';
import {NewTodoComponent} from './new-todo/new-todo.component';
import {ToDoScreenRoutingModule} from './todo-screen-routing.module';

@NgModule({
  declarations: [
    TodoScreenComponent,
    NewTodoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ToDoScreenRoutingModule
  ],
  providers: [],
})
export class ToDoScreenModule {}
