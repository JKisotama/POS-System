import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})



export class AdminComponent implements OnInit {
  isAdminGoodsPage = false;
  isAdminGoodGroup = false;
  isAdminPOS = false
  isAdminPropertyGroup = false;
  isAdminSupplier = false;
  isAdminCustomer = false

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isAdminGoodsPage = currentRoute === '/Admin'
      this.isAdminGoodGroup = currentRoute === '/Admin/good-group'
      this.isAdminPOS = currentRoute === '/Admin/POS'
      this.isAdminPropertyGroup = currentRoute === '/Admin/property-group'
      this.isAdminSupplier = currentRoute === '/Admin/supplier'
      this.isAdminCustomer = currentRoute === '/Admin/customer'
    });
  }
}