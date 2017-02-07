import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable, Subject} from "rxjs";
import {Contact} from "./models/contact";


@Injectable()
export class ContactsService {

  private contactsBaseUrl: string

  constructor(private http: Http, @Inject("baseUrl") private baseUrl:string) {
    this.contactsBaseUrl = `${this.baseUrl}/contacts`;
  }

  getContacts():Observable<Array<Contact>> {
    return this.http.get(this.contactsBaseUrl)
      .map(res => res.json())
      .map(data => data.items);
  }

  get(id: string):Observable<Contact> {
    return this.http.get(`${this.contactsBaseUrl}/${id}`)
      .map(res => res.json())
      .map(data => data.item);
  }

  updateContact(contact: Contact):Observable<any> {
    return this.http.put(`${this.contactsBaseUrl}/${contact.id}`, contact);
  }

  addContact(contact: Contact):Observable<any> {
    console.log(`in addContact with ${contact}`);
    return this.http.post(`${this.contactsBaseUrl}`, contact);
  }

  search(term: string):Observable<Array<Contact>> {
    return this.http.get(`${this.baseUrl}/search?text=${term}`)
      .map(res => res.json())
      .map(data => data.items);
  }

  searchable(term$: Subject<string>):Observable<Array<Contact>> {
    return term$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.search(term));
  }
}
