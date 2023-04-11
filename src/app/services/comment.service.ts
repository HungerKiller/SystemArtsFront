import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(ApiRoute.COMMENT.getComments(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(ApiRoute.COMMENT.getComment(commentId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(ApiRoute.COMMENT.postComment(), comment, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  putComment(commentId: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(ApiRoute.COMMENT.putComment(commentId), comment, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(ApiRoute.COMMENT.deleteComment(commentId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getCommentsbyResource(resourceId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(ApiRoute.COMMENT.getCommentsbyResource(resourceId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
