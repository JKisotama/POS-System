import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsDTO } from '../../Staff/goods/model';
import { LoadingService } from '../../../loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGoodsService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  private baseUrl = 'https://localhost:5000/api/Admin';

  GetAllProduct(storeId: string): Observable<any> {
    let url = `${this.baseUrl}/GetAllGoods?store_id=${storeId}`;
    
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

 



}