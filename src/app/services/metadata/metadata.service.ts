import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { webUri } from 'src/app/config/constant';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  webUri: string = webUri;

  constructor(private http: HttpClient) { }

  addMetadata(data) {
    return  this.http.post(this.webUri + '/metadata', data);
  }

  updateMetadata(data) {
    return this.http.put(this.webUri + '/metadata/' + data._id, data);
  }

  deleteMetadata(id) {
    return  this.http.delete(this.webUri + '/metadata/' + id);
  }

  getAllMetadata() {
    return  this.http.get(this.webUri + '/metadata');
  }}
