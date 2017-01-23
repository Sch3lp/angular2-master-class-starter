import {Component} from '@angular/core';
import {Contact} from './models/contact';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">Contacts</md-toolbar>
    <md-list>
      <md-list-item>
        <img md-list-avatar [src]="contact.image" alt="Picture of {{contact.name}}">
        <h3 md-line>{{contact.name}}</h3>
      </md-list-item>
    </md-list>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent {
  private contact:Contact = {
    id: 6,
    name: 'Diana Ellis',
    email: '',
    phone: '',
    birthday: '',
    website: '',
    image: '/assets/images/6.jpg',
    address: {
      street: '6554 park lane',
      zip: '43378',
      city: 'Rush',
      country: 'United States'
    }
  };
}
