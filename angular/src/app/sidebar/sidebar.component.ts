import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../API/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
  
})
export class SidebarComponent implements OnInit{

  isDropdownOpen = false;
  userRole: number | null = null;


  constructor(
    private authenticationService: AuthenticationService
  ){}
  ngOnInit(): void {
    this.userRole = this.authenticationService.getUserRole();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
