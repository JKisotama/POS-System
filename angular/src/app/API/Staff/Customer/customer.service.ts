import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { CustomerDTO } from './model';
import { LoadingService } from '../../../loading.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) { }

  private baseUrl = 'https://localhost:5000/api/Customer';

  GetAllCustomer(customerId: string): Observable<any> {
    this.loadingService.show();
    return this.http.get(`${this.baseUrl}/GettAllCustomer?company_id=${customerId}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
  createCustomer(CustomerData: CustomerDTO): Observable<any> {
    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/SaveCustomer`, CustomerData).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
  updateCustomer(CustomerData: CustomerDTO): Observable<any> {
    this.loadingService.show();
    return this.http
      .put(
        `${this.baseUrl}/EditCustomer?company_id=${CustomerData.companyId}&customer_id=${CustomerData.customerId}&customer_name=${CustomerData.customerName}&customer_address=${CustomerData.customerAddress}&customer_phone=${CustomerData.customerPhone}&customer_email=${CustomerData.customerEmail}`,
        CustomerData
      )
      .pipe(finalize(() => this.loadingService.hide()));
  }

  deleteCustomer(companyId: string, customerId: string): Observable<any> {
    this.loadingService.show();
    return this.http.delete(
      `${this.baseUrl}/DeleteCustomer?comapny_id=${companyId}&customer_id=${customerId}`
    ).pipe(finalize(() => this.loadingService.hide()));
  }

  GetCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }



}