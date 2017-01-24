import {Component, OnInit, Input} from '@angular/core';
import {TabsComponent} from "./tabs.component";

@Component({
  selector: 'trm-tab',
  template: `<ng-content *ngIf="isSelected"></ng-content>`
})
export class TabComponent implements OnInit {

  @Input()
  private title:string;
  @Input()
  private isSelected:boolean;

  constructor(private parent:TabsComponent) { }

  ngOnInit() {
    this.parent.addTab(this);
  }

  select() {
    this.isSelected = true;
  }

  deselect() {
    this.isSelected = false;
  }
}
