import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../API/authentication.service';
import { UserService } from '../API/Staff/user/user.service';
import { Menu } from '../API/Admin/users/model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
  
})
export class SidebarComponent implements OnInit{

  isDropdownOpen = false;
  userRole: number | null = null;
  storeId: string | null = null;
  loginName: string | null = null;
  userMenu: Menu[] = [];


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ){}
  ngOnInit(): void {
    this.userRole = this.authenticationService.getUserRole();
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.getMenus();
  }

  getMenus(){
    this.userService.getMenus(this.storeId!, this.loginName!).subscribe((data) => {
      this.userMenu = data;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  hasMenuOrder(order: number): boolean {
    return this.userMenu.some(menu => menu.menuOrder === order);
  }

}
