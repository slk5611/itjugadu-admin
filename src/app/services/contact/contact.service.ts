import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webUri } from '../../config/constant';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  webUri: string = webUri;
  constructor(private http: HttpClient) { }

  addContact(data) {
    return  this.http.post(this.webUri + '/contacts', data);
  }

  updateContact(data) {
    return this.http.put(this.webUri + '/contacts/' + data._id, data);
  }

  deleteContact(id) {
    return  this.http.delete(this.webUri + '/contacts/' + id);
  }

  getAllContact() {
    return  this.http.get(this.webUri + '/contacts');
  }
}
