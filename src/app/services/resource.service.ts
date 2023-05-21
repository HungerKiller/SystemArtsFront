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
    return this.http.get<Resource[]>(ApiRoute.RESOURCE.getResources());
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

  getResourcesByUserId(userId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(ApiRoute.RESOURCE.getResourcesByUserId(userId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
