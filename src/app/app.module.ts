import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {environment} from "../environments/environment";
import {FormsModule} from "@angular/forms";

import {APP_ROUTES} from "./app.routes";
import {ContactsAppComponent} from './contacts.component';
import {ContactsService} from "./contacts.service";
import {ContactsListComponent} from './contacts-list/contacts-list.component';
import {ContactsEditorComponent} from './contacts-editor/contacts-editor.component';
import {ContactsDetailComponent} from './contacts-detail/contacts-detail.component';
import {ContactsDetailViewComponent} from './contacts-detail-view/contacts-detail-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';


@NgModule({
  declarations: [ContactsAppComponent, ContactsListComponent, ContactsDetailComponent, ContactsEditorComponent, ContactsDetailViewComponent, TabsComponent, TabComponent],
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
