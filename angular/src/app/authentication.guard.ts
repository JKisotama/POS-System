import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './API/Admin/authentication.service';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          const userRole = this.authService.getUserRole();
          const allowedPagesForStaff = ['goods-page', 'good-group', 'pos', 'supplier'];

          // Check if user is staff and if the route is allowed
          if (userRole === 1 && !allowedPagesForStaff.includes(next.routeConfig?.path || '')) {
            this.snackBar.open('You have no right to access this page', 'Close', { duration: 3000 });
            this.router.navigate(['/goods-page']); // Redirect to home or another page
            return false;
          }
          return true; // Allow access if logged in and has permission
        } else {
          this.router.navigate(['/']); // Redirect to login if not logged in
          return false;
        }
      })
    );
  }
}
