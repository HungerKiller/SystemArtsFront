import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { ApiRoute } from '../api-routes';
import { Resource } from '../models/Resource';
import { ResourceFile } from '../models/ResourceFile';

@Injectable({
    providedIn: 'root'
})
export class ResourceFileService {

    get token(): any {
        return localStorage.getItem('token');
    }

    constructor(private http: HttpClient) { }

    getResourceFiles(): Observable<ResourceFile[]> {
        return this.http.get<ResourceFile[]>(ApiRoute.RESOURCEFILE.getResourceFiles());
    }

    getResourceFile(resourceFileId: number): Observable<Resource> {
        return this.http.get<Resource>(ApiRoute.RESOURCEFILE.getResourceFile(resourceFileId), { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    uploadResourceFile(resourceId: number, formData: FormData): Observable<Resource> {
        return this.http.post<Resource>(ApiRoute.RESOURCEFILE.uploadResourceFile(resourceId), formData, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    putResourceFile(resourceFileId: number, resourceFile: ResourceFile): Observable<ResourceFile> {
        return this.http.put<ResourceFile>(ApiRoute.RESOURCEFILE.putResourceFile(resourceFileId), resourceFile, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    deleteResourceFile(resourceFileId: number): Observable<Resource> {
        return this.http.delete<Resource>(ApiRoute.RESOURCEFILE.deleteResourceFile(resourceFileId), { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
    }

    downloadResourceFile(resourceFileId: number): Observable<any> {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<any>(ApiRoute.RESOURCEFILE.downloadResourceFile(resourceFileId), { responseType: 'blob' as 'json', headers: headers });
    }
}