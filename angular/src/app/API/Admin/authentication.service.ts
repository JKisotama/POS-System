import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInUserName: string | null = null;
  private storeIdUser: string | null = null;
  private userRole: number | null = null; // Store user role
  private readonly storageKey = 'loggedInUser';
  private readonly storageKeyStoreId = 'loggedInStoreId';
  private readonly storageUserRoleKey = 'userRole'; // Key for user role

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    const loggedInUser = sessionStorage.getItem(this.storageKey);
    const storeIdUser = sessionStorage.getItem(this.storageKeyStoreId);
    const userRole = sessionStorage.getItem(this.storageUserRoleKey);

    if (loggedInUser) {
      this.loggedInUserName = loggedInUser;
      this.storeIdUser = storeIdUser;
      this.userRole = userRole ? parseInt(userRole) : null; // Parse role from storage
      this.isLoggedInSubject.next(true);
    }
  }

  setLoggedIn(value: boolean, loginName: string | null = null, storeId: string | null = null, userRole: number | null = null) {
    if (value) {
      this.loggedInUserName = loginName || '';
      this.storeIdUser = storeId || '';
      this.userRole = userRole; // Set user role

      sessionStorage.setItem(this.storageKey, this.loggedInUserName);
      sessionStorage.setItem(this.storageKeyStoreId, this.storeIdUser);
      sessionStorage.setItem(this.storageUserRoleKey, String(this.userRole));

    } else {
      this.loggedInUserName = null;
      this.storeIdUser = null;
      this.userRole = null;

      sessionStorage.removeItem(this.storageKey);
      sessionStorage.removeItem(this.storageKeyStoreId);
      sessionStorage.removeItem(this.storageUserRoleKey);
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

  logout() {
    this.setLoggedIn(false);
  }


}
