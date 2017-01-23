import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service";
import { Contact } from "../models/contact";

@Component({
  selector: 'trm-contacts-list',
  template: `
    <md-nav-list>
      <a md-list-item *ngFor="let contact of contacts; trackBy: byId" [routerLink]="['contact',contact.id]">
        <img md-list-avatar [src]="contact.image" alt="Picture of {{contact.name}}">
        <h3 md-line>{{contact.name}}</h3>
      </a>
    </md-nav-list>
`,
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  private contacts: Array<Contact>;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  byId(idx:number, contact:Contact) {
    return contact.id;
  }
}
