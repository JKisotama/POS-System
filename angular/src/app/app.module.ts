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
import { ReactiveFormsModule } from '@angular/forms';
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
import { CreateSellPriceComponent } from './staff/goods-page/create-sell-price/create-sell-price.component';
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
