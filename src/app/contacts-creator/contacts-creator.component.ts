import {Component, OnInit} from '@angular/core';
import {Contact} from "../models/contact";
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {checkEmailAvailability} from "../email-availability-validator.directive";
import {emailValidator} from "../email-validator.directive";

@Component({
  selector: 'trm-contacts-creator',
  template: `
<div class="trm-contacts-creator">
  <form [formGroup]="form" (ngSubmit)="save(form.value)" novalidate>
    <md-card>
      <md-card-title-group>
        <img md-card-md-image alt="Placeholder image" src="/assets/images/placeholder.png">
        <md-card-title></md-card-title>
        <md-card-subtitle></md-card-subtitle>
      </md-card-title-group>
      <md-card-content>
        <div fxLayout="column">
          <md-input-container fxFlex [dividerColor]="form.get('name').errors ? 'warn' : 'primary'">
            <input md-input placeholder="Name" formControlName="name">
            <md-hint align="end" *ngIf="!form.get('name').valid && !form.get('name').pristine">
              <template [ngIf]="form.get('name').errors?.required">This field is required</template>
              <template [ngIf]="form.get('name').errors?.minlength">A name must have at least {{form.get('name').errors.minlength.requiredLength}} characters, but was {{form.get('name').errors.minlength.actualLength}}.</template>
            </md-hint>
          </md-input-container>
          <md-input-container fxFlex [dividerColor]="form.get('email').errors ? 'warn' : 'primary'">
            <input md-input placeholder="Email" formControlName="email">
            <md-hint align="end" *ngIf="!form.get('email').valid && !form.get('email').pristine">
              <template [ngIf]="!form.get('email').errors?.validEmail && !form.get('email').errors?.emailTaken">The email address should look like example@mail.com.</template>
              <template [ngIf]="form.get('email').errors?.emailTaken">Sorry, but {{form.get('email').value}} is already taken. :(</template>
            </md-hint>
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Birthday" formControlName="birthday" type="date">
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Phone" formControlName="phone">
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Website" formControlName="website">
          </md-input-container>
          <fieldset fxLayout="column" formGroupName="address">
            <legend>Address</legend>
            <md-input-container fxFlex>
              <input md-input placeholder="Street" formControlName="street">
            </md-input-container>
            <md-input-container fxFlex>
              <input md-input placeholder="Zip" formControlName="zip">
            </md-input-container>
            <md-input-container fxFlex>
              <input md-input placeholder="City" formControlName="city">
            </md-input-container>
            <md-input-container fxFlex>
              <input md-input placeholder="Country" formControlName="country">
            </md-input-container>
          </fieldset>
        </div>
      </md-card-content>
      <md-card-actions fxLayout fxLayoutAlign="center center">
        <button md-button type="submit" [disabled]="!form.valid">Save</button>
        <a md-button title="Cancel creating new contact" [routerLink]="'/'">Cancel</a>
      </md-card-actions>
    </md-card>
  </form>
</div>
`,
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {

  form: FormGroup;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', emailValidator, checkEmailAvailability(this.contactsService)],
        birthday: '',
        phone: '',
        website: '',
        address: this.formBuilder.group(
          {
            street: '',
            zip: '',
            city: '',
            country: ''
          }
        )
      }
    );
  }

  save(contact: Contact) {
    this.contactsService.addContact(contact).subscribe(res => this.navigateToList());
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

}
