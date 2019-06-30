import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./todos/components/todo-screen/todo-screen.module').then(m => m.ToDoScreenModule) },
  { path: 'done', loadChildren: () => import('./todos/components/done-screen/done-todos.module').then(m => m.DoneScreenModule) },
  { path: 'details', loadChildren: () => import('./todos/components/detail-screen/detail-screen.module').then(m => m.DetailScreenModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

