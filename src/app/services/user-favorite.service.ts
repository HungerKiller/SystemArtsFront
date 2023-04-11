import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { UserFavorite } from '../models/UserFavorite';

@Injectable({
  providedIn: 'root'
})
export class UserFavoriteService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getUserFavorites(): Observable<UserFavorite[]> {
    return this.http.get<UserFavorite[]>(ApiRoute.USERFAVORITE.getUserFavorites(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postUserFavorite(userFavorite: UserFavorite): Observable<UserFavorite> {
    return this.http.post<UserFavorite>(ApiRoute.USERFAVORITE.postUserFavorite(), userFavorite, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteUserFavorite(userFavoriteId: number): Observable<UserFavorite> {
    return this.http.delete<UserFavorite>(ApiRoute.USERFAVORITE.deleteUserFavorite(userFavoriteId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getUserFavoritesbyUser(userId: number): Observable<UserFavorite[]> {
    return this.http.get<UserFavorite[]>(ApiRoute.USERFAVORITE.getUserFavoritesbyUser(userId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
