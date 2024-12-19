import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../API/Admin/users/model';
import { UserService } from '../../API/Staff/user/user.service';
import { AuthenticationService } from '../../API/authentication.service';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  storeId: string | null = null;
  loginName: string | null = null;

  userData: UserDTO | null = null;


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.getUserByLoginName();
  }


  getUserByLoginName(){
    if(this.storeId && this.loginName){
      this.userService.getUserByLoginName(this.storeId, this.loginName).subscribe((response) => {
        this.userData = response;
      });
    }
  }

  openEditUserProfile(user: UserDTO){
     const dialogRef = this.dialog.open(EditUserProfileComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: {user}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Update Information successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
      });
        this.getUserByLoginName(); 
        this.userService.updateUserInHeader();
      }
    });
  }

}
