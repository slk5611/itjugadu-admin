import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webUri } from '../../config/constant';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  webUri: string = webUri;
  constructor(private http: HttpClient) { }

  addSubscriber(data) {
   return this.http.post(this.webUri + '/newsletters', data);
  }

  deleteSubscriber(id) {
   return this.http.delete(this.webUri + '/newsletters/' + id);
  }

  getAllSubscriber() {
   return this.http.get(this.webUri + '/newsletters');
  }

  updateSubscriber(data) {
    return this.http.put(this.webUri + '/newsletters/' + data._id, data);
  }
}
