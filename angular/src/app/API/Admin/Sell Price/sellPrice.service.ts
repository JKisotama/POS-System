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

    private baseUrl = 'http://localhost:3000/sellPrice';

    GetAllSellPrice(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createSellPrice(SellPriceData: SellPriceDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, SellPriceData);
    }
    updateSellPrice(SellPriceData: SellPriceDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${SellPriceData['id']}`, SellPriceData);
    }
    deleteSellPrice(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetSellPriceById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }



}