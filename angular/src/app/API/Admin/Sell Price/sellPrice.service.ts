import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellPriceDTO } from './model';


@Injectable({
    providedIn: 'root',
})
export class SellPriceService {

    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';
 
    // GetAllSellPrice(): Observable<any>{
    //     return this.http.get(`${this.baseUrl}`);
    // }
    createSellPrice(SellPriceData: SellPriceDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}/SaveSellingPrice?goods_id=${SellPriceData.goodsId}&unit=${SellPriceData.goodsUnit}&barcode=${SellPriceData.barcode}&quantity=${SellPriceData.quantity}&selling_price=${SellPriceData.sellPrice}`, SellPriceData);
    }
    // updateSellPrice(SellPriceData: SellPriceDTO): Observable<any> {
    //     return this.http.put(`${this.baseUrl}/${SellPriceData['id']}`, SellPriceData);
    // }
    deleteSellPrice(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetSellPriceById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }



}