import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  constructor(
    private router : Router
  ){}
 

  navigateToProduct() {
    
    this.router.navigate(['/product']);
  }

}
