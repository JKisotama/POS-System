import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {
  isStaffGoodsPage = false;
  isStaffGoodGroup = false;
  isStaffPOS = false
  isStaffPropertyGroup = false;
  isStaffSupplier = false;
  isStaffCustomer = false

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isStaffGoodsPage = currentRoute === '/Staff'
      this.isStaffGoodGroup = currentRoute === '/Staff/good-group'
      this.isStaffPOS = currentRoute === '/Staff/POS'
      this.isStaffPropertyGroup = currentRoute === '/Staff/property-group'
      this.isStaffSupplier = currentRoute === '/Staff/supplier'
      this.isStaffCustomer = currentRoute === '/Staff/customer'
    });
  }
}
