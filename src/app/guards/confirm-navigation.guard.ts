import {Observable} from "rxjs";
import {RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate} from "@angular/router";
import {Component, Injectable} from "@angular/core";
import {MdDialog} from "@angular/material";
import {ConfirmDeactivationDialogComponent} from "./confirm-deactivation-dialog.component";

export interface Deactivatable extends Component {
  okToDeactivate(): boolean;
}

@Injectable()
export class ConfirmNavigationGuard implements CanDeactivate<Deactivatable> {
  private _dialog: MdDialog;

  constructor(dialog: MdDialog) {
    this._dialog = dialog;
  }

  canDeactivate(component: Deactivatable, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return component.okToDeactivate()
      ? Observable.of(true)
      : this._dialog
          .open(ConfirmDeactivationDialogComponent, { disableClose: false})
          .afterClosed()
      ;
  }
}
