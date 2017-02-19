import {Directive, forwardRef} from '@angular/core';
import {FormControl, NG_ASYNC_VALIDATORS} from "@angular/forms";
import {ContactsService, emailIsAvailable} from "./contacts.service";

function checkEmailAvailability(contactsService: ContactsService) {
  return (c: FormControl) => {
    return contactsService.isEmailAvailable(c.value)
      .map(availability => {
        return emailIsAvailable(availability)
          ? null
          : {emailTaken: true};
      });
  };
}

@Directive({
  selector: '[trmEmailShouldBeAvailable][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailAvailabilityValidator),
      multi: true }
  ]
})
export class EmailAvailabilityValidator {
  private _validate: Function;

  constructor(contactsService: ContactsService) {
    this._validate = checkEmailAvailability(contactsService);
  }

  validate(control: FormControl) {
    return this._validate(control);
  }

}
