import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierDTO } from './model';

@Injectable({
    providedIn: 'root',
})

export class SupplierService {

    constructor(
        private http: HttpClient
    ){}

    private baseUrl = 'http://localhost:7062/api/Suppliers';


    GetAllSupplier(storeId: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/Get-All-Supplier?store_id=${storeId}`);
    }
    createSupplier(SupplierData: SupplierDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, SupplierData);
    }

    deleteSupplier(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetSupplierById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }


}