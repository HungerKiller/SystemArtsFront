import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { Resource } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(ApiRoute.RESOURCE.getResources(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getResource(resourceId: number): Observable<Resource> {
    return this.http.get<Resource>(ApiRoute.RESOURCE.getResource(resourceId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(ApiRoute.RESOURCE.postResource(), resource, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  putResource(resourceId: number, resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(ApiRoute.RESOURCE.putResource(resourceId), resource, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteResource(resourceId: number): Observable<Resource> {
    return this.http.delete<Resource>(ApiRoute.RESOURCE.deleteResource(resourceId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  uploadResource(resourceId: number, formData: FormData): Observable<Resource> {
    return this.http.post<Resource>(ApiRoute.RESOURCE.uploadResource(resourceId), formData, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  // todo return type as any => it is ok?
  downloadResource(resourceId: number): Observable<any> {
    return this.http.get<any>(ApiRoute.RESOURCE.downloadResource(resourceId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getResourcesByUserId(userId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(ApiRoute.RESOURCE.getResourcesByUserId(userId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
