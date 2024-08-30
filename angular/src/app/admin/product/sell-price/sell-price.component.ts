import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { SellPriceDTO } from '../../../API/Admin/Sell Price/model';
import { SellPriceService } from '../../../API/Admin/Sell Price/sellPrice.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { EditSellPriceComponent } from './edit-sell-price/edit-sell-price.component';
import { HeaderComponent } from '../../header/header.component';



@Component({
  selector: 'app-sell-price',
  templateUrl: './sell-price.component.html',
  styleUrl: './sell-price.component.scss'
})
export class SellPriceComponent implements OnInit {

  product: ProductDTO;
  sellPrice: SellPriceDTO[];

  sellPriceData: SellPriceDTO[] = [];

  newSellPrice: SellPriceDTO = {
    goodsId: '',
    barCode: '',
    goodsUnit: '',
    sellNumber: '',
    sellPrice: '',
  }

  editSellPrice: SellPriceDTO = {
    goodsId: '',
    barCode: '',
    goodsUnit: '',
    sellNumber: '',
    sellPrice: '',
  }

  showForm = false;

  displayColumns: string[]= ['goodsId', 'barCode', 'goodsUnit', 'sellNumber', 'sellPrice', 'action'];

  dataSource = new MatTableDataSource<SellPriceDTO>();

  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;


  constructor(
    public dialogRef: MatDialogRef<SellPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {product: ProductDTO, sellPrice: SellPriceDTO[]},
    private sellPriceService: SellPriceService,
    private dialog: MatDialog
  ){
    this.product = data.product;
    this.sellPrice = data.sellPrice;
    this.dataSource.data = this.sellPrice;
  }

  ngOnInit(): void {
    this.fetchSellPrice();
  }

  fetchSellPrice(){
    this.sellPriceService.GetAllSellPrice().subscribe((sellPrice) => {
      this.sellPrice = sellPrice.filter((sell: SellPriceDTO) => sell.goodsId === this.product.goodsId);
      this.dataSource.data = this.sellPrice;
      
    })
  }

  onSubmit(form: NgForm){
    if( form.valid){
      this.newSellPrice.goodsId = this.product.goodsId;
      this.sellPriceService.createSellPrice(this.newSellPrice).subscribe(
        (response) => {
          console.log('New Sell Price created:', response);
          this.fetchSellPrice();
        },
        (error) => {
          console.error('Error creating Sell Price:', error);
        }
      )
    }
  }

  openEditSellPrice(sellPrice: SellPriceDTO) {
    this.editSellPrice = {...sellPrice};

    const dialogRef = this.dialog.open(EditSellPriceComponent, {
      width: '400px',
      data: {editSellPrice: this.editSellPrice}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Sell Price Edited', result);

        const index = this.sellPriceData.findIndex(s => s.goodsId === result.goodsId);
        this.sellPriceData[index] = result;
        this.ngOnInit();
      }
    })
  }

  deleteSellPrice(id: string) {
    if(id) {
      this.sellPriceService.deleteSellPrice(id).subscribe(
        (response) => {
          console.log('Sell Price Deleted Successfully');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting Sell Price:', error);

        }      
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete Sell Price because id is undefined.');
    }

  }
  
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

}
