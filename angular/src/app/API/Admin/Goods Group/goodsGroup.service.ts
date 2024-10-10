import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsGroupDTO } from './model';

@Injectable({
    providedIn: 'root',
})

export class GoodsGroupService {
    constructor(
        private http: HttpClient
    ){}

    private baseUrl = 'http://localhost:7062/api/GoodGroup';

    GetAllGoodsGroup(storeId: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/Get-All-Group?store_id=${storeId}`);
    }
    createGoodsGroup(GoodsGroupData: GoodsGroupDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}/Save Good Group`, GoodsGroupData);
    }
    
    deleteGoodsGroup(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}