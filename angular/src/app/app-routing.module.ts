import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserControllerComponent } from './admin/user-controller/user-controller.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { GoodsReceiptComponent } from './admin/goods-receipt/goods-receipt.component';
import { CustomerComponent } from './admin/customer/customer.component';

const routes: Routes = [
  { path: '', component:UserControllerComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path : 'product', component: ProductComponent},
  { path: 'staff', component: UserControllerComponent},
  { path: 'supplier', component: SupplierComponent},
  { path: 'goodsReceipt', component: GoodsReceiptComponent},
  {path : 'customer' , component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
