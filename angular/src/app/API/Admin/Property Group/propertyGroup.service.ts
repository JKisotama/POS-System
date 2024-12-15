import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { PropertyGroupDTO } from './model';
import { LoadingService } from '../../../loading.service';

@Injectable({
    providedIn: 'root',
})

export class PropertyGroupService {

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';

    GetAllPropertyGroup(storeId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetAllPropertyGroup?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    createPropertyGroup(PropertyGroupData: PropertyGroupDTO): Observable<any> {
        this.loadingService.show();
        return this.http.post(`${this.baseUrl}/SavePropertyGroup`, PropertyGroupData).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    updateGroupProperty(PropertyGroupData: PropertyGroupDTO): Observable<any> {
        this.loadingService.show();
        const url = `${this.baseUrl}/UpdateGroupProperty?store_id=${PropertyGroupData.storeId}&property_id=${PropertyGroupData.propertyId}&property_name=${PropertyGroupData.propertyName}`;
        return this.http.put(url, {}).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    deleteGroupProperty(storeId: string, groupId: string): Observable<any> {
        this.loadingService.show();
        const url = `${this.baseUrl}/DeleteGroupProperty?store_id=${storeId}&group_id=${groupId}`;
        return this.http.delete(url).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    GetPropertyGroupById(id: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

}