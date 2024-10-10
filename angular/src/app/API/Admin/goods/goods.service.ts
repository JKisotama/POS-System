import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsDTO } from './model';

@Injectable({
    providedIn: 'root',
})
export class GoodsService {

    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/goods';

    GetAllProduct(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createProduct(productData: GoodsDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, productData);
    }
    updateProduct(productData: GoodsDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${productData['id']}`, productData);
    }
    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetProductById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }



}