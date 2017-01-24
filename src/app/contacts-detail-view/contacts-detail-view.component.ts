import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact";
import {Router, ActivatedRoute} from "@angular/router";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'trm-contacts-detail-view',
  template: `
  <trm-contacts-detail 
    [contact]="contact"
    (edit)="navigateToEditor($event)"
    (back)="navigateToList()">
  </trm-contacts-detail>
`,
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {
  private contact:Contact;

  constructor(
    private contactsService: ContactsService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.contactsService.get(this.route.snapshot.params['id'])
      .subscribe(contact => this.contact = contact);
  }

  navigateToEditor(contact:Contact) {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

}
