import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../API/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit {
  items: MenuItem[] | undefined;
  fullName: string | null = null;
  userRole: number | null = null;

  constructor(private authenticationService: AuthenticationService){
    
  }

  ngOnInit() {
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
