import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
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
          <button md-button title="Edit" (click)="edit.emit(contact)">Edit</button>
          <button md-button title="Go back to list" (click)="back.emit()">Go Back</button>
        </md-card-actions>
      </md-card>
    </div>
  `,
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent {

  @Input()
  private contact:Contact;

  @Output()
  private edit = new EventEmitter<Contact>();

  @Output()
  private back = new EventEmitter<void>();

}
