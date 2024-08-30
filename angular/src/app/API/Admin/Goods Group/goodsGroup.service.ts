import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsGroupDTO } from './model';

@Injectable({
    providedIn: 'root',
})

export class GoodsGroupService {
    constructor(
        private http: HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/goodsGroup';

    GetAllGoodsGroup(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createGoodsGroup(GoodsGroupData: GoodsGroupDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, GoodsGroupData);
    }
    updateGoodsGroup(GoodsGroupData: GoodsGroupDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${GoodsGroupData['id']}`, GoodsGroupData);
    }
    deleteGoodsGroup(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}