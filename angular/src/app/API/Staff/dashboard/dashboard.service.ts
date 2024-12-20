import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsSoldReport, SaleReport } from './model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'https://localhost:5000/api/SaleReport';

  constructor(private http: HttpClient) {}

  getSaleReport(storeId: string, startDate: string, endDate: string): Observable<SaleReport[]> {
    const params = new HttpParams()
      .set('storeId', storeId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<SaleReport[]>(`${this.baseUrl}/GetSaleReport`, { params });
  }

  getReportByGoodsSold(storeId: string, startDate: string, endDate: string): Observable<GoodsSoldReport[]> {
    const params = new HttpParams()
      .set('storeId', storeId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<GoodsSoldReport[]>(`${this.baseUrl}/GetReportByGoodsSold`, { params });
  }
}