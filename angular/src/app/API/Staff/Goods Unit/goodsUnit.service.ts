import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { GoodsUnitDTO } from './model';
import { LoadingService } from '../../../loading.service';


@Injectable({
    providedIn: 'root',
})

export class GoodsUnitService {

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService
        
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';

    GetAllGoodsUnit(storeId: string, goodsId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetGoodUnit?store_id=${storeId}&goods_id=${goodsId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    createGoodsUnit(goodsUnitData: GoodsUnitDTO): Observable<any> {
        const url = `${this.baseUrl}/SaveUnit`;
        const params = new HttpParams()
            .set('GoodsId', goodsUnitData.goodsId || '')
            .set('Barcode', goodsUnitData.barcode || '')
            .set('GoodsUnit', goodsUnitData.goodsUnit || '')
            .set('UnitSize', goodsUnitData.unitSize?.toString() || '')
            .set('UnitStatus', goodsUnitData.unitStatus?.toString() || '')
            .set('UnitStock', goodsUnitData.unitStock?.toString() || '')
            .set('StoreId', goodsUnitData.storeId || '');
        
        return this.http.post(url, null, { params }).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    updateGoodsUnit(
        GoodsUnitData: GoodsUnitDTO
    ): Observable<any> {
        const updateUrl = `${this.baseUrl}/UpdateUnit?store_id=${GoodsUnitData.storeId}&goods_id=${GoodsUnitData.goodsId}&unit=${GoodsUnitData.goodsUnit}&size=${GoodsUnitData.unitSize}&status=${GoodsUnitData.unitStatus}&stock=${GoodsUnitData.unitStock}`;
        this.loadingService.show();
        return this.http.put(updateUrl, {}).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    deleteGoodsUnit(storeId: string, goodsUnit: string): Observable<any> {
        const url = `${this.baseUrl}/DeleteGoodsUnit`;
        const params = {
            store_id: storeId,
            goods_unit: goodsUnit,
        };
    
        this.loadingService.show();
    
        return this.http.delete(url, { params, responseType: 'text' }).pipe(
            finalize(() => this.loadingService.hide()) // Ensure spinner hides after completion
        );
    }
}       