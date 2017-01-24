import {Component, ContentChildren, QueryList, AfterContentInit} from "@angular/core";
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
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent)
  private tabs: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit() {
    this.tabs.first.select();
  }

  select(child: TabComponent) {
    this.tabs.forEach(tab => tab === child ? tab.select() : tab.deselect());
  }
}
