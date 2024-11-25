import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { PosHeaderComponent } from './POS/pos-header/pos-header.component';
import { PosFooterComponent } from './POS/pos-footer/pos-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './admin/admin-page/dashboard/dashboard.component';

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
import { GoodsPageComponent } from './admin/goods-page/goods-page.component';
import {  MatMenuModule} from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select';
import { UserControllerComponent } from './admin/user-controller/user-controller.component';
import { CreateStaffComponent } from './admin/user-controller/create-staff/create-staff.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './API/Admin/authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { GoodsGroupComponent } from './admin/goods-group/goods-group.component';
import { CreateGoodGroupComponent } from './admin/goods-group/create-good-group/create-good-group.component';
import { PropertyGroupComponent } from './admin/property-group/property-group.component';
import { CreatePropertyGroupComponent } from './admin/property-group/create-property-group/create-property-group.component';
import { CreateGoodsComponent } from './admin/goods-page/create-goods/create-goods.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { CreateSupplierComponent } from './admin/supplier/create-supplier/create-supplier.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { CreateCustomerComponent } from './admin/customer/create-customer/create-customer.component';
import { AdminComponent } from './admin/admin.component';
import { POSComponent } from './pos/pos.component';
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
    AdminComponent,
    POSComponent,

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


    ToolbarModule, ButtonModule, SplitButtonModule,InputTextModule,AvatarModule,CarouselModule, ButtonModule, TagModule,
    
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
