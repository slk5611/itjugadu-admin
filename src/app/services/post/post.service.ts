import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webUri } from '../../config/constant';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  webUri: string = webUri;
  constructor(private http: HttpClient) { }

  getAllPost() {
    return this.http.get(this.webUri + '/posts');
  }

  addPost(data) {
    return this.http.post(this.webUri + '/posts',  data);
  }

  deletePost(id) {
    return this.http.delete(this.webUri + '/posts/' + id);
  }

  updatePost(id, data) {
    return this.http.put(this.webUri + '/posts/' + id, data);
  }

  getCommentByPost(id) {
    return this.http.get(this.webUri + '/comments/' + id);
  }

  deleteComment(commentId) {
    return this.http.delete(this.webUri + '/comments/' + commentId);
  }
}
