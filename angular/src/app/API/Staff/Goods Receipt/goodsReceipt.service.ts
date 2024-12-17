import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsReceiptDTO } from './model';

@Injectable({
    providedIn: 'root',
})

export class GoodsReceiptService {

    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/receipt';

    GetAllGoodsReceipt(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createGoodsReceipt(GoodsReceiptData: GoodsReceiptDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, GoodsReceiptData);
    }
    updateGoodsReceipt(GoodsReceiptData: GoodsReceiptDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${GoodsReceiptData['id']}`, GoodsReceiptData);
    }
    deleteGoodsReceipt(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetGoodsReceiptById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }



}