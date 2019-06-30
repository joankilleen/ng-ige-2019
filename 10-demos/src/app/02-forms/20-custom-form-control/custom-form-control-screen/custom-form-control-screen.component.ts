import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <h1>Rating Form</h1>
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">

      <div>
        <label>
          Name:
          <input type="text" formControlName="name"/>
        </label>
      </div>

      <br/>

      <div>
        <label>
          Rating:
          <aw-star-rating formControlName="rating"></aw-star-rating>
        </label>
      </div>

      <br/>
      <br/>

      <div>
        <button type="submit">Submit</button>
      </div>

    </form>
  `,
})
export class CustomFormControlScreenComponent implements OnInit {

  myForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl({value: null, disabled: false}, [Validators.required]),
      rating: new FormControl({value: null, disabled: true}, [Validators.required])
    });

    this.myForm.get('name').valueChanges.subscribe(
      value => this.onValueChanges(value),
    );

  }

  private onValueChanges(nameValue: string) {
    const ratingControl = this.myForm.get('rating');
    if (nameValue) {
      ratingControl.enable();
    } else {
      ratingControl.disable();
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

}


// DEMO: custom control also works with template driven forms and [(ngModel)].
// <form (ngSubmit)="onSubmit()">
// <input type="text" name="name" [(ngModel)]="name"/>
//   <aw-star-rating name="rating" [(ngModel)]="rating"></aw-star-rating>
//   <button type="submit">Submit</button>
// </form>
