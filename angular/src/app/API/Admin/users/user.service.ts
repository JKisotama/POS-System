import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../loading.service';
import { UserDTO } from './model';


@Injectable({
    providedIn: 'root',
})

export class AdminUserService {
    private baseUrlAdmin = 'https://localhost:5000/api/Admin';
    private baseUrl = 'https://localhost:5000/api/Users';


    constructor( private http: HttpClient, private loadingService: LoadingService){}


    

    GetAllUser(storeId: string): Observable<any>{

        this.loadingService.show();
        return this.http.get(`${this.baseUrlAdmin}/GetAllUsers?store_id=${storeId}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    CreateUser(user: UserDTO): Observable<any>{
        this.loadingService.show();
        return this.http.post(`${this.baseUrl}/CreateUser?StoreId=${user.storeId}&LoginName=${user.loginName}&FullName=${user.fullName}&PassWord=${user.passWord}&UserLevel=${user.userLevel}&UserStatus=${user.userStatus}`, user).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    deleteUser(storeId: string, loginName: string){
        this.loadingService.show();

        return this.http.delete(`${this.baseUrl}/DeleteUser?store_id=${storeId}&login_name=${loginName}`).pipe(
            finalize(() => this.loadingService.hide())
        )
    }

    UpdateUser(user: UserDTO): Observable<any>{
        this.loadingService.show();
        return this.http.put(`${this.baseUrl}/UpdateUser?FullName=${user.fullName}&PassWord${user.passWord}&UserStatus=${user.userStatus}&store_id=${user.storeId}&login_name=${user.loginName}`, user).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}




