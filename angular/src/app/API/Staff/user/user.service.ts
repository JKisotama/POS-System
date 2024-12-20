import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Menu, UserDTO } from '../../Admin/users/model';
import { LoadingService } from '../../../loading.service';


@Injectable({
    providedIn: 'root',
})

export class UserService {
    private baseUrl = 'https://localhost:5000/api/Users';


    private userUpdatedSource = new BehaviorSubject<boolean>(false);
    userUpdated$ = this.userUpdatedSource.asObservable();

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

    getUserByLoginName(storeId: string, loginName: string): Observable<any>{
        this.loadingService.show();
        return this.http.get(`${this.baseUrl}/GetUserById?store_id=${storeId}&login_name=${loginName}`).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    updateUser(user: UserDTO, avatarFile: File): Observable<any> {
        const formData = new FormData();
    
        // Append the avatar file to the form data
       
        formData.append('avatar', avatarFile);
        
    
        // Construct the query parameters
        const queryParams = new URLSearchParams({
            FullName: user.fullName || '',
            Address: user.address || '',
            Phone: user.phone || '',
            DoB: user.doB || '',
            Email: user.email || '',
            Gender: user.gender || '',
            store_id: user.storeId || '',
            login_name: user.loginName || '',
        }).toString();
    
        this.loadingService.show();
    
        // Make the PUT request with the query parameters and form data
        return this.http.put(`${this.baseUrl}/UpdateUser?${queryParams}`, formData).pipe(
            finalize(() => this.loadingService.hide())
        );
    }

    getMenus(storeId: string, loginName: string): Observable<Menu[]> {
        const url = `${this.baseUrl}/GetMenus?store_id=${storeId}&login_name=${loginName}`;
        return this.http.get<Menu[]>(url);
    }




    updateUserInHeader() {
        this.userUpdatedSource.next(true);
      }
    
      resetUpdateFlag() {
        this.userUpdatedSource.next(false);
      }

    
}





