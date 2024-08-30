import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserControllerComponent } from './admin/user-controller/user-controller.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SideBarComponent } from './admin/side-bar/side-bar.component';
import { HeaderComponent } from './admin/header/header.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateStaffComponent } from './admin/user-controller/create-staff/create-staff.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { EditStaffComponent } from './admin/user-controller/edit-staff/edit-staff.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './admin/product/product.component';
import { CreateProductComponent } from './admin/product/create-product/create-product.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import {MatListItemIcon, MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GoodsUnitComponent } from './admin/product/goods-unit/goods-unit.component';
import { DetailsProductComponent } from './admin/product/details-product/details-product.component';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { SellPriceComponent } from './admin/product/sell-price/sell-price.component';
import { EditGoodsUnitComponent } from './admin/product/goods-unit/edit-goods-unit/edit-goods-unit.component';
import { EditSellPriceComponent } from './admin/product/sell-price/edit-sell-price/edit-sell-price.component';
import { GoodsPropertyComponent } from './admin/product/goods-property/goods-property.component';
import { EditGoodsPropertyComponent } from './admin/product/goods-property/edit-goods-property/edit-goods-property.component';
import { GoodsGroupComponent } from './admin/product/goods-group/goods-group.component';
import { EditGoodsGroupComponent } from './admin/product/goods-group/edit-goods-group/edit-goods-group.component';
import { PropertyGroupComponent } from './admin/product/property-group/property-group.component';
import { EditPropertyGroupComponent } from './admin/product/property-group/edit-property-group/edit-property-group.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { EditSupplierComponent } from './admin/supplier/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './admin/supplier/add-supplier/add-supplier.component';
import { GoodsReceiptComponent } from './admin/goods-receipt/goods-receipt.component';
import { AddGoodsReceiptComponent } from './admin/goods-receipt/add-goods-receipt/add-goods-receipt.component';
import { EditGoodsReceiptComponent } from './admin/goods-receipt/edit-goods-receipt/edit-goods-receipt.component';
import { InventoryComponent } from './admin/goods-receipt/inventory/inventory.component';
import { EditInventoryComponent } from './admin/goods-receipt/inventory/edit-inventory/edit-inventory.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AddCustomerComponent } from './admin/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './admin/customer/edit-customer/edit-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserControllerComponent,
    DashboardComponent,
    SideBarComponent,
    HeaderComponent,
    CustomerComponent,
    CreateStaffComponent,
    EditStaffComponent,
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
    GoodsUnitComponent,
    DetailsProductComponent,
    SellPriceComponent,
    EditGoodsUnitComponent,
    EditSellPriceComponent,
    GoodsPropertyComponent,
    EditGoodsPropertyComponent,
    GoodsGroupComponent,
    EditGoodsGroupComponent,
    PropertyGroupComponent,
    EditPropertyGroupComponent,
    SupplierComponent,
    EditSupplierComponent,
    AddSupplierComponent,
    GoodsReceiptComponent,
    AddGoodsReceiptComponent,
    EditGoodsReceiptComponent,
    InventoryComponent,
    EditInventoryComponent,
    AddCustomerComponent,
    EditCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatListItemIcon,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatOptionModule,
    
    

    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
