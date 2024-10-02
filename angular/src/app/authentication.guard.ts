import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './API/admin/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedInSubject.value) {
      return true;
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/userlogin']);
      return false;
    }
  }
}