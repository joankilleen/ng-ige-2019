import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DetailScreenRoutingModule} from './detail-screen-routing.module';
import {DetailScreenComponent} from './detail-screen.component';

@NgModule({
  declarations: [
    DetailScreenComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DetailScreenRoutingModule
  ],
  providers: [],
})
export class DetailScreenModule { }
