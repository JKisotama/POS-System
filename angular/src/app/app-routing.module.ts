import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsPageComponent } from './admin/goods-page/goods-page.component';
import { PosMainComponent } from './POS/pos-main/pos-main.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { UserControllerComponent } from './admin/user-controller/user-controller.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { GoodsGroupComponent } from './admin/goods-group/goods-group.component';

const routes: Routes = [
  { path: 'goods-page', component: GoodsPageComponent, canActivate: [AuthenticationGuard]},
  { path: 'pos', component: PosMainComponent},
  { path: 'admin', component: AdminPageComponent , canActivate: [AuthenticationGuard]},
  { path: 'user', component: UserControllerComponent},
  { path: 'login', component: LoginComponent},
  { path: 'good-group', component: GoodsGroupComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  