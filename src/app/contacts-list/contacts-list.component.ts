import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../contacts.service";
import {Contact} from "../models/contact";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'trm-contacts-list',
  template: `
    <md-toolbar>
      <md-input-container dividerColor="accent" class="trm-search-container">
        <input md-input type="text" (input)="term$.next($event.target.value)">
      </md-input-container>
      <md-icon color="accent">search</md-icon>
    </md-toolbar>
    <md-nav-list>
      <a md-list-item *ngFor="let contact of contacts | async; trackBy: byId" [routerLink]="['contact',contact.id]">
        <img md-list-avatar [src]="contact.image" alt="Picture of {{contact.name}}">
        <h3 md-line>{{contact.name}}</h3>
      </a>
    </md-nav-list>
`,
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  private contacts: Observable<Array<Contact>>;
  private term$: Subject<string> = new Subject<string>();

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
    this.contacts = this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.contactsService.search(term))
      .merge(this.contactsService.getContacts());
  }

  byId(idx: number, contact: Contact) {
    return contact.id;
  }
}
