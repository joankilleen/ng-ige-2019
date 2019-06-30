import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {DoneScreenComponent} from './done-screen.component';
import {RouterModule} from '@angular/router';
import {DoneScreenRoutingModule} from './done-screen-routing.module';

@NgModule({
  declarations: [
    DoneScreenComponent,
  ],
  exports: [
    DoneScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DoneScreenRoutingModule,
  ],
  providers: [],
})
export class DoneScreenModule { }
