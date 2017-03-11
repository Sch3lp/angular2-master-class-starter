import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {APP_ROUTES} from "./app.routes";
import {ContactsAppComponent} from "./contacts.component";
import {ContactsService} from "./contacts.service";
import {ContactsListComponent} from "./contacts-list/contacts-list.component";
import {ContactsEditorComponent} from "./contacts-editor/contacts-editor.component";
import {ContactsDetailComponent} from "./contacts-detail/contacts-detail.component";
import {ContactsDetailViewComponent} from "./contacts-detail-view/contacts-detail-view.component";
import {EventBusService} from "./event-bus.service";
import {ContactsCreatorComponent} from "./contacts-creator/contacts-creator.component";
import {EmailValidator} from "./email-validator.directive";
import {EmailAvailabilityValidator} from "./email-availability-validator.directive";
import {ContactsDashboardComponent} from "./contacts-dashboard/contacts-dashboard.component";
import {AboutComponent} from "./about/about.component";
import {ConfirmNavigationGuard} from "./guards/confirm-navigation.guard";
import {ConfirmDeactivationDialogComponent} from "./guards/confirm-deactivation-dialog.component";

export function askForConfirmation() {
  return window.confirm('Navigate away without saving?');
}

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent,
    ContactsDetailViewComponent,
    ContactsCreatorComponent,
    EmailValidator,
    EmailAvailabilityValidator,
    ContactsDashboardComponent,
    AboutComponent,
    ConfirmDeactivationDialogComponent
  ],
  entryComponents: [
    ConfirmDeactivationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    ContactsService,
    EventBusService,
    ConfirmNavigationGuard,
    { provide: 'baseUrl', useValue: environment.baseUrl },
    { provide: 'ConfirmNavigationGuard', useValue: askForConfirmation },
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule { }


