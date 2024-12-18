import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../loading.service';

@Injectable({
    providedIn: 'root',
})

export class AdminPropertyGroupService {

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
    ){}

    private baseUrl = 'https://localhost:5000/api/Admin';

    GetAllPropertyGroup(storeId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetAllGroupProperties?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
   

}