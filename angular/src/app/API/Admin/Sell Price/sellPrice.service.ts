import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SellPriceDTO } from './model';
import { LoadingService } from '../../../loading.service';


@Injectable({
    providedIn: 'root',
})
export class SellPriceService {

    constructor(
        private http : HttpClient,
        private loadingService: LoadingService,
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';
 
    GetAllSellPrice(storeId: string, goodsId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetSellPrice?store_id=${storeId}&goods_id=${goodsId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    createSellPrice(SellPriceData: SellPriceDTO): Observable<any> {
        this.loadingService.show();
        return this.http.post(`${this.baseUrl}/SaveSellingPrice?goods_id=${SellPriceData.goodsId}&unit=${SellPriceData.goodsUnit}&barcode=${SellPriceData.barcode}&quantity=${SellPriceData.quantity}&selling_price=${SellPriceData.sellPrice}`, SellPriceData).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    // updateSellPrice(SellPriceData: SellPriceDTO): Observable<any> {
    //     return this.http.put(`${this.baseUrl}/${SellPriceData['id']}`, SellPriceData);
    // }
    deleteSellPrice(id: string): Observable<any> {
        this.loadingService.show();
        return this.http.delete(`${this.baseUrl}/${id}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    GetSellPriceById(id: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }



}