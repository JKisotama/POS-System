import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { GoodsGroupDTO } from './model';
import { LoadingService } from '../../../loading.service';

@Injectable({
    providedIn: 'root',
})

export class GoodsGroupService {
    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';

    GetAllGoodsGroup(storeId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetAllGroup?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    createGoodsGroup(GoodsGroupData: GoodsGroupDTO): Observable<any> {
        this.loadingService.show();
        return this.http.post(`${this.baseUrl}/SaveGoodGroup`, GoodsGroupData).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    updateGoodsGroup(
        GoodsGroupData: GoodsGroupDTO
    ): Observable<any> {
        this.loadingService.show();
        const url = `${this.baseUrl}/UpdateGroup?store_id=${GoodsGroupData.storeId}&group_id=${GoodsGroupData.groupId}&group_name=${GoodsGroupData.groupName}&group_status=${GoodsGroupData.groupStatus}`;
        return this.http.put(url, {}).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    
    deleteGroup(storeId: string, groupId: string): Observable<any> {
        this.loadingService.show();
        const url = `${this.baseUrl}/DeleteGroup?store_id=${storeId}&group_id=${groupId}`;
        return this.http.delete(url).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}