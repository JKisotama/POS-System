import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { POSDetailDto, POSDto } from './model';
import { GoodsDTO } from '../goods/model';
import { LoadingService } from '../../../loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class POSService {
    constructor(
        private http : HttpClient,
        private loadingService: LoadingService
    ){}

    private baseUrl = 'https://localhost:5000/api/PoS';

    generatePoHeader(storeId: string, posCreator: string): Observable<POSDto> {
        const url = `${this.baseUrl}/GenerateTempHeader`;
        const params = { storeId, posCreator }; 

        this.loadingService.show();
    
        return this.http.get<POSDto>(url, { params }).pipe(
            finalize(() => this.loadingService.hide()) // Hide loading spinner
          );
    }

    getPoHeadersPaged(storeId: string): Observable<{ items: POSDto[]; totalCount: number }> {
        const url = `${this.baseUrl}/GetPoHeadersPaged`;
        const params = { storeId };
      
        return this.http.get<{ items: POSDto[]; totalCount: number }>(url, { params });
    }

    getGoodsList(storeId: string, goodsName: string): Observable<{ items: GoodsDTO[]; totalCount: number }> {
        const url = `${this.baseUrl}/GetGoodsList`;
        const params = { store_id: storeId, goodName: goodsName };

        this.loadingService.show();
        return this.http.get<{ items: GoodsDTO[]; totalCount: number }>(url, { params }).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    addItem(item: POSDetailDto): Observable<string> {
        const url = `${this.baseUrl}/AddItem`;
        const params = new HttpParams()
            .set('storeId', item.storeId || '')
            .set('posNumber', item.posNumber || '')
            .set('goodsId', item.goodsId || '')
            .set('barcode', item.barCode || '')
            .set('groupProperty', item.property || '')
            .set('goodProperty', item.goodProperty || '')
            .set('goodsUnit', item.goodsUnit || '')
            .set('quantity', item.quantity || '0')
            .set('posCreator', item.posCreator || ''); // Adjust dynamically as needed
    
        return this.http.post(url, {}, { params, responseType: 'text' });
    }


    getPOList(storeId: string, posNumber: string): Observable<POSDetailDto[]> {
        const url = `${this.baseUrl}/GetPOList`;
        const params = new HttpParams()
        .set('store_id', storeId)
        .set('posNumber', posNumber);

        return this.http.get<POSDetailDto[]>(url, { params });
    }

    finalizeTransaction(
        storeId: string,
        posNumber: string,
        customerPay: number,
        payer: string,
        paymentMethod: number
    ): Observable<string> {
        const url = `${this.baseUrl}/FinalizeTransaction`;
    
        // Create HttpParams with the required parameters
        const params = new HttpParams()
            .set('storeId', storeId)
            .set('posNumber', posNumber)
            .set('customerPay', customerPay.toString()) // Convert to string
            .set('payer', payer)
            .set('paymentMethod', paymentMethod.toString()); // Convert to string
    
        // Send the params in the POST request
        return this.http.post(url, {}, { params, responseType: 'text' });
    }

    getPoHangList(storeId: string): Observable<POSDto[]> {
        const url = `${this.baseUrl}/GetPoHangList`;
        const params = new HttpParams().set('store_id', storeId);

        this.loadingService.show();
        return this.http.get<POSDto[]>(url, { params }).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    hangPo(storeId: string, posNumber: string): Observable<void> {
        const url = `${this.baseUrl}/HangPO`;
        const params = new HttpParams()
            .set('storeId', storeId)
            .set('posNumber', posNumber);
    
        return this.http.put<void>(url, {}, { params });
    }
    

    

    
}