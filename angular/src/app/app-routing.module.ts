import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsPageComponent } from './admin/goods-page/goods-page.component';
import { PosMainComponent } from './POS/pos-main/pos-main.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { UserControllerComponent } from './admin/user-controller/user-controller.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { GoodsGroupComponent } from './admin/goods-group/goods-group.component';
import { PropertyGroupComponent } from './admin/property-group/property-group.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { POSComponent } from './pos/pos.component';


const routes: Routes = [
  { path: 'pos-main', component: PosMainComponent},
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
      { path: 'POS', component: POSComponent},
    ]
  },
  // { path: 'Admin/good-group', component: GoodsGroupComponent, canActivate: [AuthenticationGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  