import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToDoScreenComponent} from './todos/components/todo-screen/to-do-screen.component';
import {DoneTodosComponent} from './todos/components/done-todos/done-todos.component';

const routes: Routes = [
  { path: '', component: ToDoScreenComponent },
  { path: 'done', component: DoneTodosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
