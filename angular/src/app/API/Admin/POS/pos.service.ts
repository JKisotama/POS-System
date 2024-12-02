import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { POSDto } from './model';
import { GoodsDTO } from '../goods/model';

@Injectable({
    providedIn: 'root',
})

export class POSService {
    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'https://localhost:5000/api/PoS';

    createPoHeader(storeId: string, cashierId: string, posCreator: string): Observable<POSDto> {
        const url = `${this.baseUrl}/CreatePoHeader`;
        const params = { storeId, cashierId, posCreator };

        return this.http.post<POSDto>(url, null, { params });
    }

    generatePoHeader(storeId: string, posCreator: string): Observable<POSDto> {
        const url = `${this.baseUrl}/GenerateTempHeader`;
        const params = { storeId, posCreator };
    
        return this.http.get<POSDto>(url, { params });
    }

    getPoHeadersPaged(storeId: string): Observable<{ items: POSDto[]; totalCount: number }> {
        const url = `${this.baseUrl}/GetPoHeadersPaged`;
        const params = { storeId };
      
        return this.http.get<{ items: POSDto[]; totalCount: number }>(url, { params });
    }

    getGoodsList(storeId: string): Observable<{ items: GoodsDTO[]; totalCount: number }> {
        const url = `${this.baseUrl}/GetGoodsList`;
        const params = { goodsName: storeId };
        return this.http.get<{ items: GoodsDTO[]; totalCount: number }>(url, { params });
    }
}