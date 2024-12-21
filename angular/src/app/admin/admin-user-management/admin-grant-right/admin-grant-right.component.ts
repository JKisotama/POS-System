import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../API/Staff/user/user.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu, UserDTO } from '../../../API/Admin/users/model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-grant-right',
  templateUrl: './admin-grant-right.component.html',
  styleUrl: './admin-grant-right.component.scss'
})
export class AdminGrantRightComponent implements OnInit {

  userMenu: Menu[] = [];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user?: UserDTO}
  ) { } 

  ngOnInit(): void {
    this.getMenus();
  }

  onCheckboxChange(menuId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const assigned = checkbox.checked ? 1 : 0;

    this.userService.grantUserRights(this.data.user?.storeId! , this.data.user?.loginName! , menuId, assigned).subscribe(
      response => {
        console.log('Rights updated successfully', response);
        this.snackBar.open('Updated grant right successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
        });
      },
      error => {
        console.error('Error updating rights', error);
      }
    );
  }

  getMenus(){
    this.userService.getMenus(this.data.user?.storeId! , this.data.user?.loginName!).subscribe((data) => {
      this.userMenu = data;
    });
  }
  hasMenuOrder(order: number): boolean {
    return this.userMenu.some(menu => menu.menuOrder === order);
  }

}
