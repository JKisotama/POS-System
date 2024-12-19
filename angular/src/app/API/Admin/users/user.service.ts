import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        return this.http.post(`${this.baseUrl}/CreateUser?StoreId=${user.storeId}&LoginName=${user.loginName}&FullName=${user.fullName}&PassWord=${user.passWord}&Address=${user.address}&Phone=${user.phone}&DoB=${user.doB}&Email=${user.email}&Gender=${user.gender}&UserLanguage=${user.userLanguage}&UserLevel=${user.userLevel}&UserStatus=${user.userStatus}`, user).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
    deleteUser(storeId: string, loginName: string){
        this.loadingService.show();

        return this.http.delete(`${this.baseUrl}/DeleteUser?store_id=${storeId}&login_name=${loginName}`).pipe(
            finalize(() => this.loadingService.hide())
        )
    }

    UpdateUser(user: UserDTO): Observable<any> {
        this.loadingService.show();
    
        const url = `${this.baseUrlAdmin}/UpdateUser`;
        const params = new HttpParams()
            .set('store_id', user.storeId || '')
            .set('login_name', user.loginName|| '')
            .set('full_name', user.fullName|| '')
            .set('user_language', user.userLanguage|| '')
            .set('user_level', user.userLevel?.toString() || '')
            .set('use_status', user.userStatus?.toString() || '');
    
        return this.http.put(url, user, { params }).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}





