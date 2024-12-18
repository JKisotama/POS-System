import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { UserDTO } from '../../Admin/users/model';
import { LoadingService } from '../../../loading.service';


@Injectable({
    providedIn: 'root',
})

export class UserService {
    private baseUrl = 'https://localhost:5000/api/Users';

    constructor( private http: HttpClient, private loadingService: LoadingService){}


    

    LoginUser(storeId: string, loginName: string, passWord: string) : Observable<any> {
        
        return this.http.post(`${this.baseUrl}/Login?store_id=${storeId}&login_name=${loginName}&password=${passWord}`, {})
    }

    GetAllUser(storeId: string): Observable<any>{

        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/Get All User?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    
}





