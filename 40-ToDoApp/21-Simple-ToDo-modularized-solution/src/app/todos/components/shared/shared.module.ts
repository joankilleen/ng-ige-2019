import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
  ],
  exports: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule { }
