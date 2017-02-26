import {Routes} from "@angular/router";
import {ContactsEditorComponent} from "./contacts-editor/contacts-editor.component";
import {ContactsDetailViewComponent} from "./contacts-detail-view/contacts-detail-view.component";
import {ContactsCreatorComponent} from "./contacts-creator/contacts-creator.component";
import {ContactsDashboardComponent} from "./contacts-dashboard/contacts-dashboard.component";
import {AboutComponent} from "./about/about.component";

export const APP_ROUTES:Routes = [
  {
    path: '',
    component: ContactsDashboardComponent,
    children: [
      {path: '', redirectTo: '/contact/0', pathMatch: 'full'},
      {path: 'contact/new', component: ContactsCreatorComponent},
      {path: 'contact/:id/edit', component: ContactsEditorComponent},
      {path: 'contact/:id', component: ContactsDetailViewComponent},
    ]
  },
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: '/'}
];
