import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../API/authentication.service';
import { UserService } from '../API/Staff/user/user.service';
import { UserDTO } from '../API/Admin/users/model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit {
  fullName: string | null = null;
  userRole: number | null = null;
  storeId: string | null = null;
  loginName: string | null = null;
  userData: UserDTO | null = null;

  constructor(private authenticationService: AuthenticationService, private userService: UserService){
    
  }

  ngOnInit() {
    this.fullName = this.authenticationService.getLoggedInFullName();
    this.userRole = this.authenticationService.getUserRole();
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.getUserByLoginName();

    this.userService.userUpdated$.subscribe(updated => {
      if (updated) {
        this.getUserByLoginName();
        this.userService.resetUpdateFlag(); // Reset the flag after fetching data
      }
    });

  }

  logout(){
    this.authenticationService.logout();
    location.reload();
  }

  getUserByLoginName(){
    if(this.storeId && this.loginName){
      this.userService.getUserByLoginName(this.storeId, this.loginName).subscribe((response) => {
        this.userData = response;
      });
    }
  }

}
