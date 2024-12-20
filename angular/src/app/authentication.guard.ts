import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './API/authentication.service';
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
          const userType = this.authService.getUserType();

          const allowedPagesForManager = ['Staff', 'Staff/good-group', 'POS', 'Staff/supplier', 'Staff/customer', 'Staff/user-profile', 'Staff/property-group', 'Staff/dashboard'];
          const allowedPagesForAdmin = ['Admin', 'Admin/good-group', 'Admin/supplier', 'Admin/customer', 'Admin/staff'];
          const allowedPagesForStaff = ['POS'];


          // Check if user is staff and if the route is allowed
          if (userRole === 1 && userType === 0 && !allowedPagesForManager.includes(next.routeConfig?.path || '')) {
            this.snackBar.open('You have no right to access this page', 'Close', {
              panelClass: ['snackbar-error'],
              duration: 3000 
            });
            this.router.navigate(['/']); // Redirect to home or another page
            return false;
          } else if (userRole === 0 && userType === 0 && !allowedPagesForAdmin.includes(next.routeConfig?.path || '')) {
            this.snackBar.open('You have no right to access this page', 'Close', {
              panelClass: ['snackbar-error'], 
              duration: 3000 
            });
            this.router.navigate(['/']); // Redirect to home or another page
            return false;
          } else if (userRole === 1 && userType === 1 && !allowedPagesForStaff.includes(next.routeConfig?.path || '')) {
            this.snackBar.open('You have no right to access this page', 'Close', {
              panelClass: ['snackbar-error'], 
              duration: 3000 
            });
            this.router.navigate(['/']); // Redirect to home or another page
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
