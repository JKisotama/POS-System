import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserDTO } from '../../API/Admin/users/model';
import { UserService } from '../../API/Staff/user/user.service';
import { AdminUserService } from '../../API/Admin/users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../API/authentication.service';
import { AdminCreateUserComponent } from './admin-create-user/admin-create-user.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent {

  displayedColumns: string[] = ['action','storeId', 'loginName', 'fullName', 'address', 'phone', 'dob', 'email', 'gender'];
    
  dataSource = new MatTableDataSource<UserDTO>();
  storeId: string | null = null;

  constructor(
    private adminUserService: AdminUserService,
    private userService : UserService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
  
  ){}

  ngOnInit() {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.GetAllUser();
  }

  GetAllUser(){
    if(this.storeId){
      this.adminUserService.GetAllUser(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      })
    }
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(AdminCreateUserComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Created new user successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
        });
        this.GetAllUser();
      }
    });
  }
  openEditUserDialog(user: UserDTO) {
    const dialogRef = this.dialog.open(AdminEditUserComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Updated new user successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
        });
        this.GetAllUser();
        
      }
    });
  }

  confirmDelete(user: UserDTO): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        message: 'Are you sure you want to delete this item?'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteUser(user);

      } else {
        this.snackBar.open('Delete operation canceled', '', {
          duration: 2000,
          panelClass: ['snackbar-error'],
        });
      }
    })
  }
  
  deleteUser(user: UserDTO): void {
    if(this.storeId && user.loginName){
      this.adminUserService.deleteUser(this.storeId, user.loginName).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', '', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.GetAllUser(); 
        },
        error: () => {
          this.snackBar.open('Error while deleting User', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }




}
