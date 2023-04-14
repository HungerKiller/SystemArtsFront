import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public subject = new Subject();
  public subject$ = this.subject.asObservable();

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(ApiRoute.AUTH.register(), user);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(ApiRoute.AUTH.login(), user);
  }

  currentUser(): Observable<User> {
    return this.http.get<User>(ApiRoute.AUTH.currentUser(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
