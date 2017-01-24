import {Component, OnInit} from '@angular/core';
import {EventBusService} from "./event-bus.service";

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">{{title}}</md-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent implements OnInit {
  private title: string;

  constructor(private eventBus:EventBusService) {}

  ngOnInit() {
    this.eventBus.observe('appTitleChanged')
      .subscribe(data => this.title = data);
  }

}
