import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service";
import { Contact } from "../models/contact";

@Component({
  selector: 'trm-contacts-list',
  template: `
    <md-list>
      <md-list-item *ngFor="let contact of contacts; trackBy: byId">
        <img md-list-avatar [src]="contact.image" alt="Picture of {{contact.name}}">
        <h3 md-line>{{contact.name}}</h3>
      </md-list-item>
    </md-list>
`,
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  private contacts: Array<Contact>;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  byId(idx:number, contact:Contact) {
    return contact.id;
  }
}
