import { NgModule } from '@angular/core';
import {AboutComponent} from "./about.component";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ABOUT_CHILD_ROUTES} from "./about.routes";


@NgModule({
  imports: [
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forChild(ABOUT_CHILD_ROUTES),
  ],
  declarations: [
    AboutComponent,
  ]
})
export class AboutModule { }
