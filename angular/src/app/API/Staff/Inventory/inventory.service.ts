import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryDTO } from './model';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {

    constructor(
        private http : HttpClient
    ){}

    private baseUrl = 'http://localhost:3000/inventory';

    GetAllInventory(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createInventory(InventoryData: InventoryDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, InventoryData);
    }
    updateInventory(InventoryData: InventoryDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${InventoryData['id']}`, InventoryData);
    }
    deleteInventory(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}