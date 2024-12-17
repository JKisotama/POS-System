import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffDTO } from './model';

@Injectable({
    providedIn: 'root',
})

export class StaffService { 
    constructor(private http : HttpClient) {}

    private baseUrl = 'http://localhost:3000/staff';

    GetAllStaff(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
    createStaff(staffData: StaffDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}`, staffData);
    }
    updateStaff(staffData: StaffDTO): Observable<any> {
        return this.http.put(`${this.baseUrl}/${staffData.code}`, staffData);
    }


}