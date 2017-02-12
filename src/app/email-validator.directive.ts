import { Directive } from '@angular/core';
import {FormControl, NG_VALIDATORS} from "@angular/forms";


function emailValidator(formControl: FormControl) {
  const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  return VALID_EMAIL.test(formControl.value)
    ? null
    : { validateEmail: {valid: false} }
}

@Directive({
  selector: '[trmValidateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: emailValidator, multi: true }
  ]
})
export class EmailValidator {}
