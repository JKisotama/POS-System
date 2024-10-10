import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './API/Admin/authentication.service';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Wait for the logged-in status to be resolved from the BehaviorSubject (async)
    return this.authService.isLoggedIn$.pipe(
      take(1),  // Only take the first emitted value (logged in state)
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;  // User is logged in, allow access
        } else {
          this.router.navigate(['/login']);  // Redirect to login if not logged in
          return false;
        }
      })
    );
  }
}
