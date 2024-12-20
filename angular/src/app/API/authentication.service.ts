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
  private userLanguage: string | null = null;
  private userType: number | null = null;

  private readonly storageKey = 'loggedInUser';
  private readonly storageKeyStoreId = 'loggedInStoreId';
  private readonly storageUserRoleKey = 'userRole'; 
  private readonly storageUserFullName = 'loggedInFullName';
  private readonly storageUserLanguage = 'userLanguage';
  private readonly storageUserType = 'userType';

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    const loggedInUser = sessionStorage.getItem(this.storageKey);
    const storeIdUser = sessionStorage.getItem(this.storageKeyStoreId);
    const userRole = sessionStorage.getItem(this.storageUserRoleKey);
    const userFullName = sessionStorage.getItem(this.storageUserFullName);
    const userLanguage = sessionStorage.getItem(this.storageUserLanguage);
    const userType = sessionStorage.getItem(this.storageUserType);

    if (loggedInUser) {
      this.loggedInUserName = loggedInUser;
      this.storeIdUser = storeIdUser;
      this.userRole = userRole ? parseInt(userRole) : null;
      this.userType = userType ? parseInt(userType) : null;
      this.loggedInFullName = userFullName; 
      this.userLanguage = userLanguage
      this.isLoggedInSubject.next(true);
    }
  }

  setLoggedIn(value: boolean, loginName: string | null = null, storeId: string | null = null, userRole: number | null = null, fullName: string | null = null, userLanguage: string | null = null, userType: number | null = null) {
    if (value) {
      this.loggedInUserName = loginName || '';
      this.storeIdUser = storeId || '';
      this.userRole = userRole;
      this.loggedInFullName = fullName || ''; 
      this.userLanguage = userLanguage || '';
      this.userType = userType;

      sessionStorage.setItem(this.storageKey, this.loggedInUserName);
      sessionStorage.setItem(this.storageKeyStoreId, this.storeIdUser);
      sessionStorage.setItem(this.storageUserRoleKey, String(this.userRole));
      sessionStorage.setItem(this.storageUserType, String(this.userType));
      sessionStorage.setItem(this.storageUserFullName, this.loggedInFullName);
      sessionStorage.setItem(this.storageUserLanguage, this.userLanguage);

    } else {
      this.loggedInUserName = null;
      this.storeIdUser = null;
      this.userRole = null;
      this.userType = null;
      this.loggedInFullName = null;
      this.userLanguage = null;

      sessionStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.storageKeyStoreId);
      sessionStorage.removeItem(this.storageUserRoleKey);
      sessionStorage.removeItem(this.storageUserFullName);
      sessionStorage.removeItem(this.storageUserLanguage);
      sessionStorage.removeItem(this.storageUserType);
    }
    this.isLoggedInSubject.next(value);
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }

  getUserRole(): number | null {
    return this.userRole;
  }

  getUserType(): number | null {
    return this.userType;
  }
  getStoreIdUser(): string | null {
    return this.storeIdUser;
  }
  getLoggedInFullName(): string | null {
    return this.loggedInFullName;
  }

  getUserLanguage(): string | null {
    return this.userLanguage;
  }

  logout() {
    this.setLoggedIn(false);
  }


}
