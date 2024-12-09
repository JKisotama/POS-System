import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsPropertyDTO } from './model';


@Injectable({
    providedIn: 'root',
})
export class GoodsPropertyService {

    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';

    GetGoodProperty(storeId: string, goodsId: string, propertyId: string): Observable<any> {
        return this.http.get(
          `${this.baseUrl}/GetGoodProperty?store_id=${storeId}&goods_id=${goodsId}&property_id=${propertyId}`
        );
      }
    createGoodsProperty(GoodsPropertyData: GoodsPropertyDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, GoodsPropertyData);
    }
    updateGoodsProperty(GoodsPropertyData: GoodsPropertyDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${GoodsPropertyData['id']}`, GoodsPropertyData);
    }
    deleteGoodsProperty(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetGoodsPropertyById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }



}