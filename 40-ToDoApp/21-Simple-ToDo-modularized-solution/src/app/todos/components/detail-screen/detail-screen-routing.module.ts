import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailScreenComponent} from './detail-screen.component';


const todoDetailsRoutes: Routes = [
    { path: ':id', component: DetailScreenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(todoDetailsRoutes)],
  exports: [RouterModule]
})
export class DetailScreenRoutingModule { }
