import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInUserName: string | null = null;
  private storeIdUser: string | null = null;
  private readonly storageKey = 'loggedInUser';
  private readonly storageKeyStoreId = 'loggedInStoreId';



  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(){
    const loggedInUser = sessionStorage.getItem(this.storageKey);
    const storeIdUSer = sessionStorage.getItem(this.storageKeyStoreId);
    if (loggedInUser) {
      this.loggedInUserName = loggedInUser;
      this.storeIdUser = storeIdUSer;
      this.isLoggedInSubject.next(true);
    }
  }

  setLoggedIn(value: boolean, loginName: string | null = null, storeId: string | null = null) {
    if (value) {
      this.loggedInUserName = loginName || '';
      this.storeIdUser = storeId || ''; // Use an empty string if loginName is null
      sessionStorage.setItem(this.storageKey, this.loggedInUserName);
      sessionStorage.setItem(this.storageKeyStoreId, this.storeIdUser);

    } else {
      this.loggedInUserName = null;
      sessionStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.storageKeyStoreId);

    } 
    this.isLoggedInSubject.next(value);
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }
  

  getStoreIdUser(): string | null {
    return this.storeIdUser;
  }

  logout() {
    this.setLoggedIn(false);
  }


}
