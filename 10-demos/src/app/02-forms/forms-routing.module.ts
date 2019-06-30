import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SingleControlReactiveComponent} from './01-single-control-reactive/single-control-reactive.component';
import {ReactiveFormComponent} from './02-reactive-form/reactive-form.component';
import {SingleControlComponent} from './03-single-control-ngmodel/single-control.component';
import {TemplateDrivenFormComponent} from './04-template-driven-form/template-driven-form.component';
import {DynamicFormComponent} from './10-dynamic-form/dynamic-form-component';
import { CustomFormControlScreenComponent } from './20-custom-form-control/custom-form-control-screen/custom-form-control-screen.component';
import { CompositionScreenComponent } from './30-composition-passing-form-group/composition-screen/composition-screen.component';
import { FormCompositionScreenComponent } from './31-composition-custom-controls/form-composition-screen/form-composition-screen.component';


const formsRoutes: Routes = [
  // {path: '', redirectTo: 'forms', pathMatch: 'full' }, // This would 'override' the default route
  {path: 'forms',
    children: [
      {path: '', redirectTo: 'single-control-reactive', pathMatch: 'full'},
      {path: 'single-control-reactive', component: SingleControlReactiveComponent},
      {path: 'reactive-form', component: ReactiveFormComponent},
      {path: 'single-control-ngmodel', component: SingleControlComponent},
      {path: 'template-driven-form', component: TemplateDrivenFormComponent},
      {path: 'dynamic-form', component: DynamicFormComponent},
      {path: 'custom-form-control', component: CustomFormControlScreenComponent},
      {path: 'composition-passing', component: CompositionScreenComponent},
      {path: 'composition-custom', component: FormCompositionScreenComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(formsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FormsRoutingModule { }
