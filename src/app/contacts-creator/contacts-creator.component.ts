import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact";
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'trm-contacts-creator',
  template: `
<div class="trm-contacts-creator">
  <form #form="ngForm" (ngSubmit)="save(form.value)">
    <md-card>
      <md-card-title-group>
        <img md-card-md-image alt="Placeholder image" src="/assets/images/placeholder.png">
        <md-card-title></md-card-title>
        <md-card-subtitle></md-card-subtitle>
      </md-card-title-group>
      <md-card-content>
        <div fxLayout="column">
          <md-input-container fxFlex>
            <input md-input placeholder="Name" name="name" ngModel>
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Email" name="email" ngModel>
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Birthday" name="birthday" type="date" ngModel>
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Phone" name="phone" ngModel>
          </md-input-container>
          <md-input-container fxFlex>
            <input md-input placeholder="Website" name="website" ngModel>
          </md-input-container>
          <fieldset fxLayout="column" ngModelGroup="address">
            <legend>Address</legend>
            <md-input-container fxFlex>
              <input md-input placeholder="Street" name="street" ngModel>
            </md-input-container>
            <md-input-container fxFlex>
              <input md-input placeholder="Zip" name="zip" ngModel>
            </md-input-container>
            <md-input-container fxFlex>
              <input md-input placeholder="City" name="city" ngModel>
            </md-input-container>
          </fieldset>
        </div>
      </md-card-content>
      <md-card-actions fxLayout fxLayoutAlign="center center">
        <button md-button type="submit">Save</button>
        <a md-button title="Cancel creating new contact" [routerLink]="'/'">Cancel</a>
      </md-card-actions>
    </md-card>
  </form>
</div>
`,
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {

  contact:Contact;

  constructor(private contactsService: ContactsService, private router: Router) { }

  ngOnInit() {}

  save(contact:Contact){
    this.contactsService.addContact(contact).subscribe(res => this.navigateToList());
  }

  navigateToList() {
    this.router.navigate(['/']);
  }

}
