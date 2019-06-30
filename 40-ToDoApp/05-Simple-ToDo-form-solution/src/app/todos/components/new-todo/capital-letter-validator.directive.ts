import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[tdCapitalLetterValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CapitalLetterValidatorDirective, multi: true}]
})
export class CapitalLetterValidatorDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} {
    console.log('validating');

    const isValid = hasFirstCapitalChar(control.value);

    return isValid ? null : {capitalLetter: true};
  }

}


function hasFirstCapitalChar(text: string): boolean {
  if (!text) {
    return null;
  }
  const firstChar = text.charAt(0);

  if (firstChar === firstChar.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}
