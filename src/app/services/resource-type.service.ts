import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { ResourceType } from '../models/ResourceType';

@Injectable({
  providedIn: 'root'
})
export class ResourceTypeService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getResourceTypes(): Observable<ResourceType[]> {
    return this.http.get<ResourceType[]>(ApiRoute.RESOURCETYPE.getResourceTypes(), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  getResourceType(resourceTypeId: number): Observable<ResourceType> {
    return this.http.get<ResourceType>(ApiRoute.RESOURCETYPE.getResourceType(resourceTypeId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  postResourceType(resourceType: ResourceType): Observable<ResourceType> {
    return this.http.post<ResourceType>(ApiRoute.RESOURCETYPE.postResourceType(), resourceType, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  putResourceType(resourceTypeId: number, resourceType: ResourceType): Observable<ResourceType> {
    return this.http.put<ResourceType>(ApiRoute.RESOURCETYPE.putResourceType(resourceTypeId), resourceType, {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }

  deleteResourceType(resourceTypeId: number): Observable<ResourceType> {
    return this.http.delete<ResourceType>(ApiRoute.RESOURCETYPE.deleteResourceType(resourceTypeId), {headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)});
  }
}
