import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../API/Admin/users/model';
import { UserService } from '../../API/Staff/user/user.service';
import { AuthenticationService } from '../../API/authentication.service';

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
    private userService: UserService
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

}
