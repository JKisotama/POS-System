import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../../API/authentication.service';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrl: './pos-header.component.scss'
})
export class PosHeaderComponent implements OnInit {
  isLightMode: boolean;

  fullName: string | null = null;
  userRole: number | null = null;

  constructor(private authenticationService: AuthenticationService,
    private themeService: ThemeService, 
    private renderer: Renderer2,

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
  }

}
