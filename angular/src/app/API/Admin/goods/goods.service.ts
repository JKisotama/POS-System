import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsDTO } from './model';
import { LoadingService } from '../../../loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  private baseUrl = 'https://localhost:5000/api/GoodGroup';

  GetProduct(storeId: string, groupId: string, filterText?: string): Observable<any> {
    let url = `${this.baseUrl}/GetGoodsByGroup?store_id=${storeId}`;
    if (groupId) {
      url += `&group_id=${groupId}`;
    }
    if (filterText) {
      url += `&filter=${filterText}`;
    }
    this.loadingService.show();

    return this.http.get(url).pipe(
       finalize(() => this.loadingService.hide())
    );
  }

  GetImage(storeId: string, goodsId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetImage?store_id=${storeId}&goods_id=${goodsId}`)
  }
  createProduct(goodsData: GoodsDTO, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    this.loadingService.show();
    return this.http.post(`${this.baseUrl}/SaveGoods?GroupId=${goodsData.groupId}&GoodsName=${goodsData.goodsName}&GoodsBrand=${goodsData.goodsBrand}&GoodsStatus=${goodsData.goodsStatus}&StoreId=${goodsData.storeId}`, formData).pipe(
      finalize(() => this.loadingService.hide())
   );
  }

  updateProduct(goodsData: GoodsDTO, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    this.loadingService.show();
    return this.http
      .put(
        `${this.baseUrl}/UpdateGoods?store_id=${goodsData.storeId}&goods_id=${goodsData.goodsId}&good_name=${goodsData.goodsName}&goods_brand=${goodsData.goodsBrand}&goods_status=${goodsData.goodsStatus}`,
        formData
      )
      .pipe(finalize(() => this.loadingService.hide()));
  }
  
  deleteProduct(storeId: string, goodsId: string): Observable<any> {
    this.loadingService.show();
    return this.http.delete(`${this.baseUrl}/DeleteGoods?store_id=${storeId}&goods_id=${goodsId}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  GetProductById(id: string): Observable<any>{
      return this.http.get(`${this.baseUrl}/${id}`);
  }



}