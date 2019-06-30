import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  template: `
    <h1>Decomposed Form</h1>
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">

      <label>Person</label>
      <div formGroupName="person">
        <input formControlName="firstName">
        <input formControlName="lastName">
      </div>

      <aw-form-section [addressFormGroup]="myForm.controls['address']"></aw-form-section>

      <br/>
      <button type="submit">Submit</button>
    </form>
  `,
})
export class CompositionScreenComponent implements OnInit {

  myForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      person: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl('')
      }),
      address: new FormGroup({})
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
