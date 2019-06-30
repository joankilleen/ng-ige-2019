import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReactiveFormComponent} from './02-reactive-form/reactive-form.component';
import {TemplateDrivenFormComponent} from './04-template-driven-form/template-driven-form.component';
import {SingleControlComponent} from './03-single-control-ngmodel/single-control.component';
import {SingleControlReactiveComponent} from './01-single-control-reactive/single-control-reactive.component';
import {NgModule} from '@angular/core';
import {FormsRoutingModule} from './forms-routing.module';
import {DynamicFormComponent} from './10-dynamic-form/dynamic-form-component';
import { StarRatingComponent } from './20-custom-form-control/star-rating/star-rating.component';
import { CustomFormControlScreenComponent } from './20-custom-form-control/custom-form-control-screen/custom-form-control-screen.component';
import { CompositionScreenComponent } from './30-composition-passing-form-group/composition-screen/composition-screen.component';
import { FormSectionComponent } from './30-composition-passing-form-group/form-section/form-section.component';
import { FormCompositionScreenComponent } from './31-composition-custom-controls/form-composition-screen/form-composition-screen.component';
import { AddressFormSectionComponent } from './31-composition-custom-controls/address-form-section/address-form-section.component';

@NgModule({
  declarations: [
    SingleControlReactiveComponent,
    ReactiveFormComponent,
    SingleControlComponent,
    TemplateDrivenFormComponent,
    DynamicFormComponent,
    StarRatingComponent,
    CustomFormControlScreenComponent,
    CompositionScreenComponent,
    FormSectionComponent,
    FormCompositionScreenComponent,
    AddressFormSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsRoutingModule
  ],
  exports: [
    // you only need to export the component if its used in a template
    // SimpleFormComponent, TemplateDrivenFormComponent, ReactiveFormComponent
  ],
  providers: [],
})
export class FormModule {}
