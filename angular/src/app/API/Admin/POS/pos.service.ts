import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { POSDto } from './model';

@Injectable({
    providedIn: 'root',
})

export class POSService {
    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'https://localhost:5000/api/PoS';


     /**
     * Creates a new POS order header.
     * @param storeId The ID of the store where the order is being created.
     * @param cashierId The ID of the cashier creating the order.
     * @param posCreator The creator of the POS order.
     * @returns An observable of the created POSDto object.
     */
    createPoHeader(storeId: string, cashierId: string, posCreator: string): Observable<POSDto> {
        const url = `${this.baseUrl}/CreatePoHeader`;
        const params = { storeId, cashierId, posCreator };

        return this.http.post<POSDto>(url, null, { params });
    }

    generatePoHeader(storeId: string, cashierId: string, posCreator: string): Observable<POSDto> {
        const url = `${this.baseUrl}/GenerateTempHeader`;
        const params = { storeId, cashierId, posCreator };
    
        return this.http.get<POSDto>(url, { params });
    }
}