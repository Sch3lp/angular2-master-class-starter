import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'trm-contacts-editor',
  template: `
    <div class="trm-contacts-editor">
      <md-card>
        <md-card-title-group class="fullBleed editing">
          <img md-card-md-image [src]="contact?.image || ''">
          <md-card-title>{{contact?.name}}</md-card-title>
          <md-card-subtitle>{{contact?.email}}</md-card-subtitle>
        </md-card-title-group>
          <md-card-content>
            <trm-tabs>
              <trm-tab title="General" fxLayout="column">
                <md-input-container fxFlex>
                  <input md-input placeholder="Name" name="name" [(ngModel)]="contact.name">
                </md-input-container>
                <md-input-container fxFlex>
                  <input md-input placeholder="Email" name="email" [(ngModel)]="contact.email">
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
              </trm-tab>
              <trm-tab title="Address" fxLayout="column">
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
              </trm-tab>
            </trm-tabs>
          </md-card-content>
        <md-card-actions fxLayout fxLayoutAlign="center center">
          <button md-button (click)="save(contact)" title="Save contact">Save</button>
          <button md-button (click)="cancel(contact)" title="Cancel editing">Cancel</button>
        </md-card-actions>
      </md-card>
    </div>
  `,
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {
  private contact:Contact = <Contact>{ address: {}};

  constructor(private contactsService: ContactsService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.contactsService.get(this.route.snapshot.params['id'])
      .subscribe(contact => this.contact = contact);
  }

  save(contact:Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(() => this.goToDetails(contact));
  }

  cancel(contact:Contact){
    this.goToDetails(contact);
  }

  private goToDetails(contact: Contact) {
    return this.router.navigate(['contact', contact.id]);
  }
}
