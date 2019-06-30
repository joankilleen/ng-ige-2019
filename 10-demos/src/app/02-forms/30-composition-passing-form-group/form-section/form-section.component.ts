import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'aw-form-section',
  template: `
    <div id="address-section">
      <h3>Address</h3>
      <div [formGroup]="addressFormGroup">

        <label>Street</label>
        <div formGroupName="street">
          <input formControlName="name">
          <input formControlName="number">
        </div>

        <label>Place</label>
        <div>
          <input formControlName="place">
        </div>

      </div>
    </div>
  `,
  styles: [`#address-section {
    background-color: lightblue; padding: 10px; margin: 10px;
  }`]
})
export class FormSectionComponent implements OnInit {

  @Input() addressFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {

    this.addressFormGroup.addControl(
      'street',
      new FormGroup({
        name: new FormControl(),
        number: new FormControl()
      }));

    this.addressFormGroup.addControl(
      'place', new FormControl()
    );
  }

}
