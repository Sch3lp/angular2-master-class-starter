import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {environment} from '../environments/environment';
import {Observable} from "rxjs";
import {Contact} from "./models/contact";

const baseUrl: string = `${environment.baseUrl}/contacts`;

@Injectable()
export class ContactsService {


  constructor(private http: Http, @Inject("baseUrl") private baseUrl:string) {
  }

  getContacts() {
    return this.http.get(baseUrl)
      .map(res => res.json())
      .map(data => data.items);
  }

  get(id: string):Observable<Contact> {
    return this.http.get(`${baseUrl}/${id}`)
      .map(res => res.json())
      .map(data => data.item);
  }
}
