import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoScreenComponent } from './todos/components/todo-screen/to-do-screen.component';
// import { NewTodoComponent } from './todos/components/new-todo/new-todo.component';
import { NewTodoComponent } from './todos/components/new-todo-reactive/new-todo.component';
import { TodoListComponent } from './todos/components/todo-list/todo-list.component';
import { TodoItemComponent } from './todos/components/todo-item/todo-item.component';
import { DoneTodosComponent } from './todos/components/done-todos/done-todos.component';
import {ToDoService} from './todos/model/todo.service';
import { CapitalLetterValidatorDirective } from './todos/components/new-todo/capital-letter-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToDoScreenComponent,
    NewTodoComponent,
    TodoListComponent,
    TodoItemComponent,
    DoneTodosComponent,
    CapitalLetterValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
