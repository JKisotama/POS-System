import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInUserName: string | null = null;
  private readonly storageKey = 'loggedInUser';



  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(){
    const loggedInUser = sessionStorage.getItem(this.storageKey);
    if (loggedInUser) {
      this.loggedInUserName = loggedInUser;
      this.isLoggedInSubject.next(true);
    }
  }

  setLoggedIn(value: boolean, loginName: string | null = null) {
    if (value) {
      this.loggedInUserName = loginName || ''; // Use an empty string if loginName is null
      sessionStorage.setItem(this.storageKey, this.loggedInUserName);
    } else {
      this.loggedInUserName = null;
      sessionStorage.removeItem(this.storageKey);
    } 
    this.isLoggedInSubject.next(value);
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }

  logout() {
    this.setLoggedIn(false);
  }


}
