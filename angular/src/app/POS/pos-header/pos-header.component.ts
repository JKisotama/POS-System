import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../../API/authentication.service';
import { ThemeService } from '../../theme.service';
import { Menu, UserDTO } from '../../API/Admin/users/model';
import { UserService } from '../../API/Staff/user/user.service';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrl: './pos-header.component.scss'
})
export class PosHeaderComponent implements OnInit {
  isLightMode: boolean;

  fullName: string | null = null;
  userRole: number | null = null;
  userType: number | null = null;
  storeId: string | null = null;
  loginName: string | null = null;

  userMenu: Menu[] = [];
  userData: UserDTO | null = null;

  constructor(private authenticationService: AuthenticationService,
    private themeService: ThemeService, 
    private renderer: Renderer2,
    private userService: UserService,

  ){
    this.isLightMode = !this.themeService.isDarkMode();

  }
  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    this.themeService.setDarkMode(!this.isLightMode);
  }

  ngOnInit(): void {
    const themeClass = this.themeService.isDarkMode() ? 'dark-mode' : 'light-mode';
    this.renderer.addClass(document.body, themeClass);


    this.fullName = this.authenticationService.getLoggedInFullName();
    this.userRole = this.authenticationService.getUserRole();
    this.userType = this.authenticationService.getUserType();
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.getUserByLoginName();
    this.getMenus();
  }

  getMenus(){
    this.userService.getMenus(this.storeId!, this.loginName!).subscribe((data) => {
      this.userMenu = data;
    });
  }
  hasMenuOrder(order: number): boolean {
    return this.userMenu.some(menu => menu.menuOrder === order);
  }

  getUserByLoginName(){
    if(this.storeId && this.loginName){
      this.userService.getUserByLoginName(this.storeId, this.loginName).subscribe((response) => {
        this.userData = response;
      });
    }
  }

  logout(){
    this.authenticationService.logout();
    location.reload();
  }

}
