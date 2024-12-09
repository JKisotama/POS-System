import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { POSDetailDto, POSDto } from './model';
import { GoodsDTO } from '../goods/model';

@Injectable({
    providedIn: 'root',
})

export class POSService {
    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'https://localhost:5000/api/PoS';

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
        const params = { store_id: storeId };
        return this.http.get<{ items: GoodsDTO[]; totalCount: number }>(url, { params });
    }

    addItem(item: POSDetailDto): Observable<string> {
        const url = `${this.baseUrl}/AddItem`;
        const params = new HttpParams()
            .set('storeId', item.storeId || '')
            .set('posNumber', item.posNumber || '')
            .set('goodsId', item.goodsId || '')
            .set('barcode', item.barCode || '')
            .set('groupProperty', item.groupPropterty || '')
            .set('goodProperty', item.goodProperty || '')
            .set('goodsUnit', item.goodsUnit || '')
            .set('quantity', item.quantity || '0')
            .set('posCreator', item.posCreator || ''); // Adjust dynamically as needed
    
        return this.http.post(url, {}, { params, responseType: 'text' });
    }
    

    

    
}