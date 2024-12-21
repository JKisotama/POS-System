import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './API/authentication.service';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { UserService } from './API/Staff/user/user.service';
import { Menu } from './API/Admin/users/model';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  userMenu: Menu[] = [];
  storeId: string | null = null;
  loginName: string | null = null;

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
    
  }

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
          const storeId = this.authService.getStoreIdUser();
          const loginName = this.authService.getLoggedInUserName();
          this.getMenus(storeId!, loginName!);

          const allowedPagesForManager = ['Staff', 'Staff/goods-page' , 'Staff/good-group', 'POS', 'Staff/supplier', 'Staff/customer', 'Staff/user-profile', 'Staff/property-group', 'Staff/dashboard'];
          const allowedPagesForAdmin = ['Admin', 'Admin/good-group', 'Admin/supplier', 'Admin/customer', 'Admin/staff'];
          const allowedPagesForStaff = ['Staff' , 'Staff/user-profile','POS'];

          const nextRoutePath = next.routeConfig?.path || '';

          // Check if user is staff and if the route is allowed
          if (userRole === 1 && userType === 0) {
            if (!allowedPagesForManager.includes(nextRoutePath)) {
              this.showAccessDeniedMessage();
              return false;
            }
            if (nextRoutePath === 'POS' && !this.hasMenuOrder(1)) {
              this.showAccessDeniedMessage();
              return false;
            }
            if (nextRoutePath === 'Staff/supplier' && !this.hasMenuOrder(3)) {
              this.showAccessDeniedMessage();
              return false;
            }
            if (nextRoutePath === 'Staff/customer' && !this.hasMenuOrder(4)) {
              this.showAccessDeniedMessage();
              return false;
            }
            if (nextRoutePath === 'Staff/dashboard' && !this.hasMenuOrder(5)) {
              this.showAccessDeniedMessage();
              return false;
            }
          } else if (userRole === 0 && userType === 0 && !allowedPagesForAdmin.includes(nextRoutePath)) {
            this.showAccessDeniedMessage();
            return false;
          } else if (userRole === 1 && userType === 1 && !allowedPagesForStaff.includes(nextRoutePath)) {
            this.showAccessDeniedMessage();
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

  getMenus(storeId: string, loginName: string){
    this.userService.getMenus(storeId, loginName).subscribe((data) => {
      this.userMenu = data;
    });
  }
  hasMenuOrder(order: number): boolean {
    return this.userMenu.some(menu => menu.menuOrder === order);
  }

  showAccessDeniedMessage() {
    this.snackBar.open('You have no right to access this page', 'Close', {
      panelClass: ['snackbar-error'],
      duration: 3000 
    });
    this.router.navigate(['/']); // Redirect to home or another page
  }
}
