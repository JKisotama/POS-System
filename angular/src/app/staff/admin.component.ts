import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})



export class AdminComponent implements OnInit {
  isGoodsPage = false;
  isGoodGroup = false;
  isPOS = false
  isPropertyGroup = false;
  isSupplier = false;
  isCustomer = false

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isGoodsPage = currentRoute === '/Admin'
      this.isGoodGroup = currentRoute === '/Admin/good-group'
      this.isPOS = currentRoute === '/Admin/POS'
      this.isPropertyGroup = currentRoute === '/Admin/property-group'
      this.isSupplier = currentRoute === '/Admin/supplier'
      this.isCustomer = currentRoute === '/Admin/customer'
    });
  }
}