import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsPageComponent } from './admin/goods-page/goods-page.component';
import { PosMainComponent } from './POS/pos-main/pos-main.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';

const routes: Routes = [
  { path: 'goods-page', component: GoodsPageComponent},
  { path: 'pos', component: PosMainComponent},
  { path: 'admin', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  