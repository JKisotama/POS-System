import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { GoodsPropertyDTO } from './model';
import { LoadingService } from '../../../loading.service';


@Injectable({
    providedIn: 'root',
})
export class GoodsPropertyService {

    constructor(
        private http : HttpClient,
        private loadingService: LoadingService
    ){}

    private baseUrl = 'https://localhost:5000/api/GoodGroup';

    GetGoodProperty(storeId: string, goodsId: string, propertyId: string): Observable<any> {
        this.loadingService.show();
        return this.http.get(
          `${this.baseUrl}/GetGoodProperty?store_id=${storeId}&goods_id=${goodsId}&property_id=${propertyId}`
        ).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    GetAllGoodPropertyByGoodId(storeId: string, goodsId: string): Observable<any> {
        this.loadingService.show();
        return this.http.get(
          `${this.baseUrl}/GetGoodPropertyById?store_id=${storeId}&goods_id=${goodsId}`
        ).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    createGoodsProperty(GoodsPropertyData: GoodsPropertyDTO): Observable<any> {
        const url = `${this.baseUrl}/SaveProperty`;
        const params: { [param: string]: string } = {
            store_id: GoodsPropertyData.storeId ?? '',
            goods_id: GoodsPropertyData.goodsId ?? '',
            property_id: GoodsPropertyData.propertyId ?? '',
            property_value: GoodsPropertyData.propertyName ?? '',
        };

        this.loadingService.show();
    
        return this.http.post(url, {}, { params, responseType: 'text'}).pipe(
            finalize(() => this.loadingService.hide()) // Hide loading spinner
        );
    }
   
    deleteGoodsProperty(storeId: string, goodsPropertyId: string): Observable<any> {
        this.loadingService.show();
        return this.http.delete(`${this.baseUrl}/DeleteGoodsProperty?store_id=${storeId}&goodsProperty_id=${goodsPropertyId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    GetGoodsPropertyById(id: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    updateGoodsProperty(
        goodPropertyData: GoodsPropertyDTO
      ): Observable<any> {
        this.loadingService.show();
      
        return this.http.put(`${this.baseUrl}/UpdateGoodsProperty?goodsPropertyId=${goodPropertyData.propertyGoodsId}&update_property=${goodPropertyData.propertyName}`, goodPropertyData).pipe(
          finalize(() => this.loadingService.hide()) // Hide loading spinner after request completes
        );
    }



}