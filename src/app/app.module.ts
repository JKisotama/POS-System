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
import { PosHeaderComponent } from './pos-header/pos-header.component';
import { PosFooterComponent } from './pos-footer/pos-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';





@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminPageComponent,
    AdminSidebarComponent,
    PosHeaderComponent,
    PosFooterComponent,
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
    
],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
