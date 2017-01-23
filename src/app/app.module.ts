import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpModule} from '@angular/http';

import {ContactsAppComponent} from './contacts.component';
import {ContactsService} from "./contacts.service";
import {ContactsListComponent} from './contacts-list/contacts-list.component';
import {RouterModule} from "@angular/router";
import {APP_ROUTES} from "./app.routes";
import {ContactsDetailComponent} from './contacts-detail/contacts-detail.component';
import {environment} from "../environments/environment";
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ContactsAppComponent, ContactsListComponent, ContactsDetailComponent, ContactsEditorComponent],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    ContactsService,
    { provide: 'baseUrl', useValue: environment.baseUrl }
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
