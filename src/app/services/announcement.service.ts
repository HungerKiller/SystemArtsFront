import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { Announcement } from '../models/Announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(ApiRoute.ANNOUNCEMENT.getAnnouncements(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getAnnouncement(announcementId: number): Observable<Announcement> {
    return this.http.get<Announcement>(ApiRoute.ANNOUNCEMENT.getAnnouncement(announcementId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(ApiRoute.ANNOUNCEMENT.postAnnouncement(), announcement, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  putAnnouncement(announcementId: number, announcement: Announcement): Observable<Announcement> {
    return this.http.put<Announcement>(ApiRoute.ANNOUNCEMENT.putAnnouncement(announcementId), announcement, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteAnnouncement(announcementId: number): Observable<Announcement> {
    return this.http.delete<Announcement>(ApiRoute.ANNOUNCEMENT.deleteAnnouncement(announcementId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
