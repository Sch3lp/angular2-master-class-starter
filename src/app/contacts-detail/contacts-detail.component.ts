import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../models/contact";

@Component({
  selector: 'trm-contacts-detail',
  template:`
    <div class="trm-contacts-detail">
      <md-card>
        <md-card-title-group class="fullBleed">
          <img md-card-md-image [src]="contact?.image || ''">
          <md-card-title>{{contact?.name}}</md-card-title>
          <md-card-subtitle>{{contact?.email}}</md-card-subtitle>
        </md-card-title-group>
        <md-card-content>
          <dl>
            <dt>Phone:</dt>
            <dd>{{contact?.phone}}</dd>
            <dt>Website:</dt>
            <dd>{{contact?.website}}</dd>
            <dt>Birthday:</dt>
            <dd>{{contact?.birthday}}</dd>
            <dt>Street:</dt>
            <dd>{{contact?.address.street}}</dd>
            <dt>Zip:</dt>
            <dd>{{contact?.address.zip}}</dd>
            <dt>City:</dt>
            <dd>{{contact?.address.city}}</dd>
            <dt>Country:</dt>
            <dd>{{contact?.address.country}}</dd>
          </dl>
        </md-card-content>
        <md-card-actions fxLayout fxLayoutAlign="center center">
          <a md-button title="Go back to list" [routerLink]="['/']">Go Back</a>
        </md-card-actions>
      </md-card>
    </div>
  `,
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  private contact:Contact;

  constructor(private contactsService: ContactsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.contactsService.get(this.route.snapshot.params['id'])
      .subscribe(contact => {
        this.contact = contact;
      });
  }

}
