import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsPageComponent } from './staff/goods-page/goods-page.component'; 
import { PosMainComponent } from './POS/pos-main/pos-main.component'; 
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { GoodsGroupComponent } from './staff/goods-group/goods-group.component'; 
import { PropertyGroupComponent } from './staff/property-group/property-group.component'; 
import { SupplierComponent } from './staff/supplier/supplier.component'; 
import { CustomerComponent } from './staff/customer/customer.component'; 
import { AdminComponent } from './admin/admin.component'; 
import { POSComponent } from './POS/pos.component';
import { StaffComponent } from './staff/staff.component';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management.component';
import { AdminGoodsPageComponent } from './admin/admin-goods-page/admin-goods-page.component';
import { AdminGoodGroupComponent } from './admin/admin-good-group/admin-good-group.component';
import { AdminPropertyGroupComponent } from './admin/admin-property-group/admin-property-group.component';
import { AdminSupplierComponent } from './admin/admin-supplier/admin-supplier.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { UserProfileComponent } from './staff/user-profile/user-profile.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'POS', component: POSComponent, canActivate: [AuthenticationGuard]},
  { path: '', component: LoginComponent},
  { path: 'property-group', component: PropertyGroupComponent, canActivate: [AuthenticationGuard]},
  {path: 'supplier', component: SupplierComponent, canActivate: [AuthenticationGuard]},
  { path: 'customer', component: CustomerComponent, canActivate: [AuthenticationGuard]},

  { path: 'Staff', component: StaffComponent, canActivate: [AuthenticationGuard],children: [
      { path: '', component: GoodsPageComponent },
      { path: 'good-group', component: GoodsGroupComponent },
      { path: 'property-group', component: PropertyGroupComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'user-profile', component: UserProfileComponent},
      { path: 'dashboard', component: DashboardComponent}
    ]
  },

  { path: 'Admin', component: AdminComponent, canActivate: [AuthenticationGuard],children: [
      { path: '', component: AdminGoodsPageComponent },
      { path: 'good-group', component: AdminGoodGroupComponent },
      { path: 'property-group', component: AdminPropertyGroupComponent},
      { path: 'supplier', component: AdminSupplierComponent },
      { path: 'customer', component: AdminCustomerComponent },
      { path: 'staff', component: AdminUserManagementComponent}
   
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  