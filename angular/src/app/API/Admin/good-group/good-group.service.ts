import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../loading.service';

@Injectable({
    providedIn: 'root',
})

export class AdminGoodsGroupService {
    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
    ){}

    private baseUrl = 'https://localhost:5000/api/Admin';

    GetAllGoodsGroup(storeId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetAllGoodsGroups?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    
}