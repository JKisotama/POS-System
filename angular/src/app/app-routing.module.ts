import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsPageComponent } from './staff/goods-page/goods-page.component'; 
import { PosMainComponent } from './POS/pos-main/pos-main.component'; 
import { AdminPageComponent } from './staff/admin-page/admin-page.component'; 
import { UserControllerComponent } from './staff/user-controller/user-controller.component'; 
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { GoodsGroupComponent } from './staff/goods-group/goods-group.component'; 
import { PropertyGroupComponent } from './staff/property-group/property-group.component'; 
import { SupplierComponent } from './staff/supplier/supplier.component'; 
import { CustomerComponent } from './staff/customer/customer.component'; 
import { AdminComponent } from './staff/admin.component'; 
import { POSComponent } from './POS/pos.component';


const routes: Routes = [
  { path: 'POS', component: POSComponent},
  { path: 'admin', component: AdminPageComponent , canActivate: [AuthenticationGuard]},
  { path: 'user', component: UserControllerComponent, canActivate: [AuthenticationGuard]},
  { path: '', component: LoginComponent},
  { path: 'property-group', component: PropertyGroupComponent, canActivate: [AuthenticationGuard]},
  {path: 'supplier', component: SupplierComponent, canActivate: [AuthenticationGuard]},
  { path: 'customer', component: CustomerComponent, canActivate: [AuthenticationGuard]},

  { path: 'Admin', component: AdminComponent, canActivate: [AuthenticationGuard],children: [
      { path: '', component: GoodsPageComponent },
      { path: 'good-group', component: GoodsGroupComponent },
      { path: 'property-group', component: PropertyGroupComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'customer', component: CustomerComponent },
     
    ]
  },
  // { path: 'Admin/good-group', component: GoodsGroupComponent, canActivate: [AuthenticationGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  