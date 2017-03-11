import {Directive, forwardRef, Input} from '@angular/core';
import {FormControl, NG_ASYNC_VALIDATORS} from "@angular/forms";
import {ContactsService, AvailableEmail} from "./contacts.service";
import {Observable} from "rxjs";

export function checkEmailAvailability(contactsService: ContactsService, currentEmail?: string) {
  return (c: FormControl) => {
    return currentEmail === c.value
      ? Observable.of(null)
      : contactsService.isEmailAvailable(c.value)
          .map(availability => {
            return availability instanceof AvailableEmail
              ? null
              : {emailTaken: true};
          });
  };
}

@Directive({
  selector: '[trmEmailShouldBeAvailable][ngModel]',
  inputs: [
    'currentEmail'
  ],
  providers: [
    { provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailAvailabilityValidator),
      multi: true
    }
  ]
})
export class EmailAvailabilityValidator {
  currentEmail:string;
  private _validate: Function;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this._validate = checkEmailAvailability(this.contactsService, this.currentEmail);
  }

  validate(control: FormControl) {
    return this._validate(control);
  }

}
