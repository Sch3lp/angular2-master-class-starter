import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ContactsService} from "../contacts.service";
import {EventBusService, EventType} from "../event-bus.service";

@Component({
  selector: 'trm-contacts-detail-view',
  template: `
  <trm-contacts-detail 
    [contact]="contact"
    (edit)="navigateToEditor($event)">
  </trm-contacts-detail>
`,
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {
  private contact:Contact;

  constructor(
    private contactsService: ContactsService,
    private eventBus: EventBusService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params
      .flatMap(params => this.contactsService.get(params['id']))
      .subscribe(contact => this.contact = contact);
    this.eventBus.emit(EventType.AppTitleChanged, 'Detail');
  }

  navigateToEditor(contact:Contact) {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
