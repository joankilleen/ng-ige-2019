import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aw-star-rating',
  template: `
    <i>{{displayText}}</i>
    <div class="stars" [ngClass]="{'disabled': disabled}">
      <ng-container *ngFor="let star of ratings">
        <svg title="{{star.text}}"
             height="25" width="23" class="star rating" [ngClass]="{'selected': star.stars <= ratingValue}"
             (mouseover)="displayText = !disabled ? star.text : ''"
             (mouseout)="displayText = ratingText ? ratingText : ''"
             (click)="setRating(star)">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
      </ng-container>
    </div>
  `,
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {

  constructor() {
  }

  public ratings = [
    {
      stars: 1,
      text: 'disappointment'
    },
    {
      stars: 2,
      text: 'meh'
    },
    {
      stars: 3,
      text: 'it\'s ok'
    },
    {
      stars: 4,
      text: 'I like it'
    },
    {
      stars: 5,
      text: 'Super Great!'
    }
  ];
  public disabled: boolean;
  public displayText: string;
  public ratingText: string;
  public ratingValue: number;

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(val) {
    this.ratingValue = val;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(star: any) {
    if (!this.disabled) {
      this.ratingValue = star.stars;
      this.ratingText = star.text;
      this.onChanged(star.stars);
      this.onTouched();
    }
  }

}
