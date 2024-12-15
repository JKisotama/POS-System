import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SupplierDTO } from './model';
import { LoadingService } from '../../../loading.service';

@Injectable({
    providedIn: 'root',
})

export class SupplierService {

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService
    ){}

    private baseUrl = 'https://localhost:5000/api/Suppliers';


    GetAllSupplier(storeId: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetAllSupplier?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    createSupplier(SupplierData: SupplierDTO): Observable<any> {
        this.loadingService.show();
        return this.http.post(`${this.baseUrl}/CreateSupplier`, SupplierData).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    updateSupplier(SupplierData: SupplierDTO): Observable<any> {
        this.loadingService.show();
        return this.http.put(`${this.baseUrl}/UpdateSupplier`, SupplierData).pipe(
          finalize(() => this.loadingService.hide())
        );
    }

    deleteSupplier(storeId: string, supplierId: string): Observable<any> {
        this.loadingService.show();
        return this.http
          .delete(`${this.baseUrl}/DeleteSupplier?store_id=${storeId}&supplier_id=${supplierId}`)
          .pipe(finalize(() => this.loadingService.hide()));
    }

    GetSupplierById(id: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }


}