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

    private baseUrl = 'http://localhost:3000/supplier';


    GetAllSupplier(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createSupplier(SupplierData: SupplierDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, SupplierData);
    }
    updateSupplier(SupplierData: SupplierDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${SupplierData['id']}`, SupplierData);
    }
    deleteSupplier(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetSupplierById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }


}