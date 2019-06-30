import { Routes, RouterModule } from '@angular/router';

import {TodoScreenComponent} from './todo-screen.component';


const appRoutes: Routes = [
  { path: '', component: TodoScreenComponent},
];

export const ToDoScreenRoutingModule = RouterModule.forChild(appRoutes);
