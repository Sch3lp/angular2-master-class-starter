import {Component, Input} from "@angular/core";

@Component({
  selector: 'trm-tab',
  template: `<ng-content *ngIf="isSelected"></ng-content>`
})
export class TabComponent {

  @Input()
  private title:string;
  @Input()
  private isSelected:boolean;

  select() {
    this.isSelected = true;
  }

  deselect() {
    this.isSelected = false;
  }
}
