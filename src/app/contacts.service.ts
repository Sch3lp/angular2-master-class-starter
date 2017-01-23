import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

const API_ENDPOINT = 'http://localhost:4201';
const baseUrl:string = `${API_ENDPOINT}/api/contacts`;

@Injectable()
export class ContactsService {


  constructor(private http:Http) { }

  getContacts() {
    return this.http.get(baseUrl)
      .map(res => res.json())
      .map(data => data.items);
  }

  get(id: string) {
    return this.http.get(`${baseUrl}/${id}`)
      .map(res => res.json())
      .map(data => data.item);
  }
}
