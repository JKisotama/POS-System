import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GoodsGroupComponent } from '../product/goods-group/goods-group.component';
import { DetailsProductComponent } from '../product/details-product/details-product.component';
import { GoodsPropertyComponent } from '../product/goods-property/goods-property.component';
import { GoodsUnitComponent } from '../product/goods-unit/goods-unit.component';
import { SellPriceComponent } from '../product/sell-price/sell-price.component';
import { PropertyGroupComponent } from '../product/property-group/property-group.component';
import { InventoryComponent } from '../goods-receipt/inventory/inventory.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() isInDialog: boolean = false;
  @Input() dialogRefGoodsGroup?: MatDialogRef<GoodsGroupComponent>;
  @Input() dialogRefDetailsProduct?: MatDialogRef<DetailsProductComponent>;
  @Input() dialogRefGoodsProperty?: MatDialogRef<GoodsPropertyComponent>;
  @Input() dialogRefGoodsUnit?: MatDialogRef<GoodsUnitComponent>;
  @Input() dialogRefSellPrice?: MatDialogRef<SellPriceComponent>;
  @Input() dialogRefGroupProperty?: MatDialogRef<PropertyGroupComponent>;
  @Input() dialogRefInventory?: MatDialogRef<InventoryComponent>;

  constructor(
    private location: Location
  ){}


  closeDialog() {
    if (this.dialogRefGoodsGroup) {
      this.dialogRefGoodsGroup.close();
    }
    if (this.dialogRefDetailsProduct) {
      this.dialogRefDetailsProduct.close();
    }
    if(this.dialogRefGoodsProperty) {
      this.dialogRefGoodsProperty.close();
    }
    if(this.dialogRefGoodsUnit) {
      this.dialogRefGoodsUnit.close();
    }
    if(this.dialogRefSellPrice){
      this.dialogRefSellPrice.close();
    }
    if(this.dialogRefGroupProperty) {
      this.dialogRefGroupProperty.close();
    }
    if(this.dialogRefInventory){
      this.dialogRefInventory.close();
    }


  }

  navigateBack() {
    this.location.back();
  }



}
