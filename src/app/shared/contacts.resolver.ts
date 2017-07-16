import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Contact} from "../models/contact";
import {Observable} from "rxjs";
import {ContactsService} from "../contacts.service";


@Injectable()
export class ContactsResolver implements Resolve<Contact> {

  constructor(private contactsService: ContactsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact>|Promise<Contact>|Contact {
    return this.contactsService.get(route.params['id']);
  }

}
