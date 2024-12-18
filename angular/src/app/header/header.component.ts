import { Component, OnInit,Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../API/authentication.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit {
  isLightMode: boolean;
  items: MenuItem[] | undefined;
  fullName: string | null = null;
  userRole: number | null = null;

  constructor(
    private themeService: ThemeService, 
    private renderer: Renderer2,
    private authenticationService: AuthenticationService,
  ) {
    this.isLightMode = !this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    this.themeService.setDarkMode(!this.isLightMode);
  }

  ngOnInit() {
    const themeClass = this.themeService.isDarkMode() ? 'dark-mode' : 'light-mode';
    this.renderer.addClass(document.body, themeClass);

    this.fullName = this.authenticationService.getLoggedInFullName();
    this.userRole = this.authenticationService.getUserRole();

      this.items = [
          {
              label: 'Update',
              icon: 'pi pi-refresh'
          },
          {
              label: 'Delete',
              icon: 'pi pi-times'
          }
      ];
  }


 

  logout(){
    this.authenticationService.logout();
    location.reload();
  }

}
