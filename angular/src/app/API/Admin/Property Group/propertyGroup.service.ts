import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyGroupDTO } from './model';

@Injectable({
    providedIn: 'root',
})

export class PropertyGroupService {

    constructor(
        private http: HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/propertyGroup';

    GetAllPropertyGroup(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createPropertyGroup(PropertyGroupData: PropertyGroupDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, PropertyGroupData);
    }
    updatePropertyGroup(PropertyGroupData: PropertyGroupDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${PropertyGroupData['id']}`, PropertyGroupData);
    }
    deletePropertyGroup(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetPropertyGroupById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }

}