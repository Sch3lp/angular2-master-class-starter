import {askForConfirmation} from "../app.module";
import {Observable} from "rxjs";
import {RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate} from "@angular/router";
import {Component, Injectable} from "@angular/core";

export interface Deactivatable extends Component {
  okToDeactivate():boolean;
}

@Injectable()
export class ConfirmNavigationGuard implements CanDeactivate<Deactivatable> {
  canDeactivate(component: Deactivatable, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return component.okToDeactivate() || askForConfirmation();
  }
}
