import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from './model';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/customer';

    GetAllCustomer(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createCustomer(CustomerData: CustomerDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, CustomerData);
    }
    updateCustomer(CustomerData: CustomerDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${CustomerData['id']}`, CustomerData);
    }
    deleteCustomer(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    GetCustomerById(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/${id}`);
    }



}