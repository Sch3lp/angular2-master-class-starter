import {Component, OnInit} from '@angular/core';
import {Contact} from './models/contact';
import {ContactsService} from "./contacts.service";

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">Contacts</md-toolbar>
    <trm-contacts-list></trm-contacts-list>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }

}
