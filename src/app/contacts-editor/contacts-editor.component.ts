import {Component, OnInit} from '@angular/core';
import {Contact} from "../models/contact";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";
import {EventBusService, EventType} from "../event-bus.service";

@Component({
  selector: 'trm-contacts-editor',
  template: `
    <div class="trm-contacts-editor">
      <form #form="ngForm" (ngSubmit)="save(contact)" novalidate>
        <md-card>
          <md-card-title-group class="fullBleed editing">
            <img md-card-md-image [src]="contact?.image || ''">
            <md-card-title>{{contact?.name}}</md-card-title>
            <md-card-subtitle>{{contact?.email}}</md-card-subtitle>
          </md-card-title-group>
            <md-card-content>
              <md-tab-group>
                <md-tab label="General">
                  <div fxLayout="column">
                    <md-input-container fxFlex [dividerColor]="name.errors ? 'warn' : 'primary'">
                      <input md-input placeholder="Name" name="name" [(ngModel)]="contact.name" required minlength="3" #name="ngModel">
                      <md-hint align="end" *ngIf="!name.valid && !name.pristine">
                        <template [ngIf]="name.errors?.required">This field is required</template>
                        <template [ngIf]="name.errors?.minlength">A name must have at least {{name.errors.minlength.requiredLength}} characters, but was {{name.errors.minlength.actualLength}}.</template>
                      </md-hint>
                    </md-input-container>
                    <md-input-container fxFlex [dividerColor]="email.errors ? 'warn' : 'primary'">
                      <input md-input placeholder="Email" name="email" [(ngModel)]="contact.email" required trmValidateEmail #email="ngModel">
                      <md-hint align="end" *ngIf="!email.valid && !email.pristine">
                        <template [ngIf]="!email.errors?.validEmail">The email address should look like example@mail.com.</template>
                      </md-hint>
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Phone" name="phone" [(ngModel)]="contact.phone">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Website" name="website" [(ngModel)]="contact.website">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Birthday" name="birthday" type="date" [(ngModel)]="contact.birthday">
                    </md-input-container>
                  </div>
                </md-tab>
                <md-tab label="Address">
                  <div fxLayout="column">
                    <md-input-container fxFlex>
                      <input md-input placeholder="Street" name="street" [(ngModel)]="contact.address.street">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Zip" name="zip" [(ngModel)]="contact.address.zip">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="City" name="city" [(ngModel)]="contact.address.city">
                    </md-input-container>
                    <md-input-container fxFlex>
                      <input md-input placeholder="Country" name="country" [(ngModel)]="contact.address.country">
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
export class ContactsEditorComponent implements OnInit {
  private contact: Contact = <Contact>{address: {}};

  constructor(private contactsService: ContactsService,
              private eventBus: EventBusService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.contactsService.get(this.route.snapshot.params['id'])
      .subscribe(contact => this.contact = contact);
    this.eventBus.emit(EventType.AppTitleChanged, 'Edit');
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(() => this.goToDetails(contact));
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  private goToDetails(contact: Contact) {
    return this.router.navigate(['contact', contact.id]);
  }
}
