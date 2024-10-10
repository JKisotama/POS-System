import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsUnitDTO } from './model';


@Injectable({
    providedIn: 'root',
})

export class GoodsUnitService {

    constructor(
        private http: HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/goodsUnit';

    GetAllGoodsUnit(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createGoodsUnit(GoodsUnitData: GoodsUnitDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, GoodsUnitData);
    }
    updateGoodsUnit(GoodsUnitData: GoodsUnitDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${GoodsUnitData['id']}`, GoodsUnitData);
    }
    deleteGoodsUnit(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}