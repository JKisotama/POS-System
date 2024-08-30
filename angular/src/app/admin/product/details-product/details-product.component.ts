import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { ProductService } from '../../../API/Admin/Product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsGroupDTO } from '../../../API/Admin/Goods Group/model';
import { GoodsUnitComponent } from '../goods-unit/goods-unit.component';
import { SellPriceComponent } from '../sell-price/sell-price.component';
import { SellPriceDTO } from '../../../API/Admin/Sell Price/model';
import { GoodsPropertyComponent } from '../goods-property/goods-property.component';
import { GoodsPropertyDTO } from '../../../API/Admin/Goods Property/model';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent  {

  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;

  product: ProductDTO;
  goodsUnit: GoodsGroupDTO[] = [];
  sellPrice: SellPriceDTO[]= [];
  goodsProperty: GoodsPropertyDTO[] = [];

  displayedColumns: string[] = ['groupId', 'goodsId', 'goodsName', 'goodsBrand', 'goodsStatus', 'action'];


  constructor(
    private productSerivce: ProductService,
    public dialogRef: MatDialogRef<DetailsProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductDTO },
    private dialog: MatDialog

  ){
    this.product = data.product;
  }

  openGoodsUnitDialog() {
    this.dialog.open(GoodsUnitComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { product: this.product, goodsUnits: this.goodsUnit, sellPrice: this.sellPrice }
    });
  }
  openSellPriceDialog(){
    this.dialog.open(SellPriceComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { product: this.product, goodsUnits: this.goodsUnit, sellPrice: this.sellPrice }
    })
  }

  openGoodsPropertyDialog(){
    this.dialog.open(GoodsPropertyComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data : {product: this.product, goodsProperty: this.goodsProperty}
    })
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }




}
