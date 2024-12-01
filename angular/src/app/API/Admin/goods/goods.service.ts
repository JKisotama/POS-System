import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodsDTO } from './model';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {

  constructor(
    private http: HttpClient
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
    return this.http.get(url);
  }

  GetImage(storeId: string, goodsId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetImage?store_id=${storeId}&goods_id=${goodsId}`)
  }
  createProduct(goodsData: GoodsDTO, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/SaveGoods?GroupId=${goodsData.groupId}&GoodsName=${goodsData.goodsName}&GoodsBrand=${goodsData.goodsBrand}&GoodsStatus=${goodsData.goodsStatus}&StoreId=${goodsData.storeId}`, formData);
  }

  // updateProduct(productData: GoodsDTO): Observable<any> {
  //     return this.http.put(`${this.baseUrl}/${productData['id']}`, productData);
  // }
  // deleteProduct(id: string): Observable<any> {
  //     return this.http.delete(`${this.baseUrl}/${id}`);
  // }

  // GetProductById(id: string): Observable<any>{
  //     return this.http.get(`${this.baseUrl}/${id}`);
  // }



}