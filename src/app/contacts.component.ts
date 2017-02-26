import {Component, OnInit} from '@angular/core';
import {EventBusService, EventType} from "./event-bus.service";

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">
  <div fxLayout fxLayoutAlign="space-between center" fxFlex>
    {{title}}
    <a md-button title="Go to about page" class="right" routerLink="about">About</a>
  </div>
</md-toolbar>
<router-outlet></router-outlet>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent implements OnInit {
  private title: string;

  constructor(private eventBus:EventBusService) {}

  ngOnInit() {
    this.eventBus.observe(EventType.AppTitleChanged)
      .subscribe(data => this.title = data);
  }

}
