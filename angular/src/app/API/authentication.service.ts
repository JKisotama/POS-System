import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInUserName: string | null = null;
  private storeIdUser: string | null = null;
  private userRole: number | null = null;
  private loggedInFullName: string | null = null;
  private readonly storageKey = 'loggedInUser';
  private readonly storageKeyStoreId = 'loggedInStoreId';
  private readonly storageUserRoleKey = 'userRole'; 
  private readonly storageUserFullName = 'loggedInFullName';

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    const loggedInUser = sessionStorage.getItem(this.storageKey);
    const storeIdUser = sessionStorage.getItem(this.storageKeyStoreId);
    const userRole = sessionStorage.getItem(this.storageUserRoleKey);
    const userFullName = sessionStorage.getItem(this.storageUserFullName);

    if (loggedInUser) {
      this.loggedInUserName = loggedInUser;
      this.storeIdUser = storeIdUser;
      this.userRole = userRole ? parseInt(userRole) : null;
      this.loggedInFullName = userFullName; 
      this.isLoggedInSubject.next(true);
    }
  }

  setLoggedIn(value: boolean, loginName: string | null = null, storeId: string | null = null, userRole: number | null = null, fullName: string | null = null ) {
    if (value) {
      this.loggedInUserName = loginName || '';
      this.storeIdUser = storeId || '';
      this.userRole = userRole;
      this.loggedInFullName = fullName || ''; 

      sessionStorage.setItem(this.storageKey, this.loggedInUserName);
      sessionStorage.setItem(this.storageKeyStoreId, this.storeIdUser);
      sessionStorage.setItem(this.storageUserRoleKey, String(this.userRole));
      sessionStorage.setItem(this.storageUserFullName, this.loggedInFullName);
      

    } else {
      this.loggedInUserName = null;
      this.storeIdUser = null;
      this.userRole = null;
      this.loggedInFullName = null;

      sessionStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.storageKeyStoreId);
      sessionStorage.removeItem(this.storageUserRoleKey);
      sessionStorage.removeItem(this.storageUserFullName);

    }
    this.isLoggedInSubject.next(value);
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }

  getUserRole(): number | null {
    return this.userRole;
  }
  getStoreIdUser(): string | null {
    return this.storeIdUser;
  }
  getLoggedInFullName(): string | null {
    return this.loggedInFullName;
  }

  logout() {
    this.setLoggedIn(false);
  }


}
