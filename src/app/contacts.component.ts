import {Component} from '@angular/core';
import {Contact} from './models/contact';
import {CONTACT_DATA} from './data/contact-data';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">Contacts</md-toolbar>
    <md-list>
      <md-list-item *ngFor="let contact of contacts; trackBy: byId">
        <img md-list-avatar [src]="contact.image" alt="Picture of {{contact.name}}">
        <h3 md-line>{{contact.name}}</h3>
      </md-list-item>
    </md-list>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent {

  private contacts = CONTACT_DATA;

  byId(idx:number, contact:Contact) {
    return contact.id;
  }
}
