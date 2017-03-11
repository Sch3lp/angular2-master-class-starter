import {Component, OnInit} from "@angular/core";
import {Contact} from "../models/contact";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";
import {EventBusService, EventType} from "../event-bus.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {emailValidator} from "../email-validator.directive";
import {checkEmailAvailability} from "../email-availability-validator.directive";
import {Deactivatable} from "../guards/confirm-navigation.guard";

@Component({
  selector: 'trm-contacts-editor',
  template: `
    <div class="trm-contacts-editor">
      <form [formGroup]="form" (ngSubmit)="save(form.value)" novalidate>
        <md-card>
          <md-card-title-group class="fullBleed editing">
            <img md-card-md-image [src]="contact?.image || ''">
            <md-card-title>{{form.get('name').value}}</md-card-title>
            <md-card-subtitle>{{form.get('email').value}}</md-card-subtitle>
          </md-card-title-group>
            <md-card-content>
              <md-tab-group>
                <md-tab label="General">
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
                        <template [ngIf]="!form.get('email').errors?.validEmail">The email address should look like example@mail.com.</template>
                      </md-hint>
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Phone" formControlName="phone">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Website" formControlName="website">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Birthday" type="date" formControlName="birthday">
                    </md-input-container>
                  </div>
                </md-tab>
                <md-tab label="Address" formGroupName="address">
                  <div fxLayout="column">
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
                  </div>
                </md-tab>
              </md-tab-group>
            </md-card-content>
          <md-card-actions fxLayout fxLayoutAlign="center center">
            <button md-button type="submit" title="Save contact" [disabled]="!form.valid">Save</button>
            <button md-button (click)="cancel(contact)" title="Cancel editing">Cancel</button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  `,
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit, Deactivatable {

  private contact: Contact = <Contact>{address: {}};
  private form: FormGroup;
  private saveButtonWasPressed: boolean = false;

  constructor(private contactsService: ContactsService,
              private eventBus: EventBusService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  okToDeactivate(): boolean {
    return this.saveButtonWasPressed;
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', emailValidator],
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

    this.route.params
      .flatMap(params => this.contactsService.get(params['id']))
      .subscribe(contact => {
          this.contact = contact;
          this.form.get('email').setAsyncValidators(checkEmailAvailability(this.contactsService, this.contact.email));
          this.form.patchValue(contact);
      });

    this.eventBus.emit(EventType.AppTitleChanged, 'Edit');
  }

  save(formValue: Contact) {
    this.saveButtonWasPressed = true;
    let contact:Contact = this.updateContactWithChangedFormValues(this.contact, formValue);
    this.contactsService.updateContact(contact)
      .subscribe(() => this.goToDetails(contact));
  }

  private updateContactWithChangedFormValues(contact:Contact, formValue: Contact):Contact {
    Object.assign(this.contact, formValue); //formValue has no id property, so the original id property will be kept
    return contact;
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  private goToDetails(contact: Contact) {
    return this.router.navigate(['contact', contact.id]);
  }
}
