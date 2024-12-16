import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './staff/admin-header/admin-header.component'; 
import { AdminPageComponent } from './staff/admin-page/admin-page.component'; 
import { AdminSidebarComponent } from './staff/admin-sidebar/admin-sidebar.component'; 
import { PosHeaderComponent } from './POS/pos-header/pos-header.component';
import { PosFooterComponent } from './POS/pos-footer/pos-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './staff/dashboard/dashboard.component'; 

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { PosMainComponent } from './POS/pos-main/pos-main.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { MatIconModule} from '@angular/material/icon'
import { GoodsPageComponent } from './staff/goods-page/goods-page.component';
import {  MatMenuModule} from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select';
import { UserControllerComponent } from './staff/user-controller/user-controller.component'; 
import { CreateStaffComponent } from './staff/user-controller/create-staff/create-staff.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './API/Admin/authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { GoodsGroupComponent } from './staff/goods-group/goods-group.component'; 
import { CreateGoodGroupComponent } from './staff/goods-group/create-good-group/create-good-group.component';
import { PropertyGroupComponent } from './staff/property-group/property-group.component'; 
import { CreatePropertyGroupComponent } from './staff/property-group/create-property-group/create-property-group.component'; 
import { CreateGoodsComponent } from './staff/goods-page/create-goods/create-goods.component'; 
import { SupplierComponent } from './staff/supplier/supplier.component'; 
import { CreateSupplierComponent } from './staff/supplier/create-supplier/create-supplier.component';
import { CustomerComponent } from './staff/customer/customer.component'; 
import { CreateCustomerComponent } from './staff/customer/create-customer/create-customer.component'; 
import { GoodsUnitComponent } from './staff/goods-unit/goods-unit.component'; 
import { CreateGoodsUnitComponent } from './staff/goods-unit/create-goods-unit/create-goods-unit.component'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminComponent } from './staff/admin.component';
import { POSComponent } from './POS/pos.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import { DialogCustomerComponent } from './POS/pos-main/dialog-customer/dialog-customer.component';
import { CreateSellPriceComponent } from './staff/goods-page/view-good-sell-price/create-sell-price/create-sell-price.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogAddCtmComponent } from './POS/pos-main/dialog-customer/dialog-add-ctm/dialog-add-ctm.component';
import { DialogProductComponent } from './POS/pos-main/dialog-product/dialog-product.component';
import { DialogInvoiceComponent } from './POS/pos-main/dialog-invoice/dialog-invoice.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CreateGoodPropertyComponent } from './staff/goods-page/view-good-property/create-good-property/create-good-property.component';
import { CreateGoodUnitComponent } from './staff/goods-page/view-good-unit/create-good-unit/create-good-unit.component';
import { ViewGoodUnitComponent } from './staff/goods-page/view-good-unit/view-good-unit.component';
import { ViewGoodSellPriceComponent } from './staff/goods-page/view-good-sell-price/view-good-sell-price.component';
import { ViewGoodPropertyComponent } from './staff/goods-page/view-good-property/view-good-property.component';
import { EditGoodUnitComponent } from './staff/goods-page/view-good-unit/edit-good-unit/edit-good-unit.component';
import { EditGoodsComponent } from './staff/goods-page/edit-goods/edit-goods.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { EditPropertyGroupComponent } from './staff/property-group/edit-property-group/edit-property-group.component';
import { EditGoodGroupComponent } from './staff/goods-group/edit-good-group/edit-good-group.component';
import { EditSupplierComponent } from './staff/supplier/edit-supplier/edit-supplier.component';
import { EditCustomerComponent } from './staff/customer/edit-customer/edit-customer.component';
import { EditGoodPropertyComponent } from './staff/goods-page/view-good-property/edit-good-property/edit-good-property.component';
import { EditGoodSellPriceComponent } from './staff/goods-page/view-good-sell-price/edit-good-sell-price/edit-good-sell-price.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminPageComponent,
    AdminSidebarComponent,
    PosHeaderComponent,
    PosFooterComponent,
    DashboardComponent,
    PosMainComponent,
    GoodsPageComponent,
    UserControllerComponent,
    CreateStaffComponent,
    LoginComponent,
    GoodsGroupComponent,
    CreateGoodGroupComponent,
    PropertyGroupComponent,
    CreatePropertyGroupComponent,
    CreateGoodsComponent,
    SupplierComponent,
    CreateSupplierComponent,  
    CustomerComponent,
    CreateCustomerComponent,
    GoodsUnitComponent,
    CreateGoodsUnitComponent,
    AdminComponent,
    POSComponent,
    DialogCustomerComponent,
    CreateSellPriceComponent,
    DialogAddCtmComponent,
    DialogProductComponent,
    DialogInvoiceComponent,
    LoadingSpinnerComponent,
    CreateGoodPropertyComponent,
    CreateGoodUnitComponent,
    ViewGoodUnitComponent,
    ViewGoodSellPriceComponent,
    ViewGoodPropertyComponent,
    EditGoodUnitComponent,
    EditGoodsComponent,
    ConfirmDialogComponent,
    EditPropertyGroupComponent,
    EditGoodGroupComponent,
    EditSupplierComponent,
    EditCustomerComponent,
    EditGoodPropertyComponent,
    EditGoodSellPriceComponent,
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    MatSidenavModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    FormsModule,
    ToolbarModule, ButtonModule, SplitButtonModule,InputTextModule,AvatarModule,CarouselModule, ButtonModule, TagModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
    
],
  providers: [
    provideClientHydration(), 
    provideAnimationsAsync(),
    AuthenticationService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
