import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(ApiRoute.USER.getUsers(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(ApiRoute.USER.getUser(userId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(ApiRoute.USER.postUser(), user, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  putUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(ApiRoute.USER.putUser(userId), user, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(ApiRoute.USER.deleteUser(userId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
