import { Routes, RouterModule } from '@angular/router';

import {DoneScreenComponent} from './done-screen.component';


const appRoutes: Routes = [
    { path: '', component: DoneScreenComponent},
];

export const DoneScreenRoutingModule = RouterModule.forChild(appRoutes);
