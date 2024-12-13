import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../API/Admin/authentication.service';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrl: './pos-header.component.scss'
})
export class PosHeaderComponent implements OnInit {

  fullName: string | null = null;
  userRole: number | null = null;

  constructor(private authenticationService: AuthenticationService){
      
  }

  ngOnInit(): void {
    this.fullName = this.authenticationService.getLoggedInFullName();
    this.userRole = this.authenticationService.getUserRole();
  }

}
