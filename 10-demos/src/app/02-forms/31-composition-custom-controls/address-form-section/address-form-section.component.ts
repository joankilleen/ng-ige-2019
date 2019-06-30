import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aw-address-form-section',
  template: `
    <div id="address-section">
      <h3>Address Component</h3>
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
    background-color: lightyellow;
    padding: 10px;
    margin: 10px;
  }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormSectionComponent),
      multi: true
    }]
})
export class AddressFormSectionComponent implements OnInit, ControlValueAccessor {

  addressFormGroup: FormGroup;
  public onTouched: () => void = () => {
  };

  constructor() {
  }

  ngOnInit() {

    this.addressFormGroup = new FormGroup({
      street: new FormGroup({
        name: new FormControl(),
        number: new FormControl()
      }),
      place: new FormControl()
    });
  }

  registerOnChange(fn: any): void {
    this.addressFormGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.addressFormGroup.disable() : this.addressFormGroup.enable();
  }

  writeValue(val: any): void {
    if (val) {
      this.addressFormGroup.setValue(val, {emitEvent: false});
    }
  }
}
