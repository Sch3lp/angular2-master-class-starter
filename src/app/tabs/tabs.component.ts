import { Component, OnInit } from '@angular/core';
import {TabComponent} from "./tab.component";

@Component({
  selector: 'trm-tabs',
  template: `
    <nav md-tab-nav-bar>
        <button type="button" md-button md-tab-link
          *ngFor="let tab of tabs"
          [class.disabled]="!tab.isSelected"
          [active]="tab.isSelected"
          (click)="select(tab)">
          {{ tab.title }}
        </button>
    </nav>
    <ng-content></ng-content>
`})
export class TabsComponent implements OnInit {
  private tabs: TabComponent[] = [];

  constructor() { }

  ngOnInit() {
  }

  addTab(childTab: TabComponent) {
    if (this.tabs.length == 0) childTab.select();
    this.tabs.push(childTab);
  }

  select(child: TabComponent) {
    this.tabs.forEach(tab => tab === child ? tab.select() : tab.deselect());
  }
}
