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

  getUser(UserId: number): Observable<User> {
    return this.http.get<User>(ApiRoute.USER.getUser(UserId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postUser(User: User): Observable<User> {
    return this.http.post<User>(ApiRoute.USER.postUser(), User, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  putUser(UserId: number, User: User): Observable<User> {
    return this.http.put<User>(ApiRoute.USER.putUser(UserId), User, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteUser(UserId: number): Observable<User> {
    return this.http.delete<User>(ApiRoute.USER.deleteUser(UserId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
