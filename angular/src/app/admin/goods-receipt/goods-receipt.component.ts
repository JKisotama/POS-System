import { Component, OnInit } from '@angular/core';
import { GoodsReceiptDTO } from '../../API/Admin/Goods Receipt/model';
import { GoodsReceiptService } from '../../API/Admin/Goods Receipt/goodsReceipt.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddGoodsReceiptComponent } from './add-goods-receipt/add-goods-receipt.component';
import { EditGoodsReceiptComponent } from './edit-goods-receipt/edit-goods-receipt.component';
import { InventoryComponent } from './inventory/inventory.component';




@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrl: './goods-receipt.component.scss'
})
export class GoodsReceiptComponent implements OnInit {

  goodsReceiptData: GoodsReceiptDTO[] = [];

  newGoodsReceipt: GoodsReceiptDTO = {
    dateReceipt: '',
    receiptNumber: '',
    supplier: '',
    totalAmount: '',
    inDept: '',
    status: ''
  }

  editGoodsReceipt: GoodsReceiptDTO = {
    dateReceipt: '',
    receiptNumber: '',
    supplier: '',
    totalAmount: '',
    inDept: '',
    status: ''
  }

  displayColumns: string[] = ['dateReceipt', 'receiptNumber', 'supplier', 'totalAmount', 'inDept', 'status', 'action'];

  dataSource = new MatTableDataSource<GoodsReceiptDTO>();

  constructor(
    private goodsReceiptService: GoodsReceiptService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllGoodsReceipt();
  }

  getAllGoodsReceipt(){
    this.goodsReceiptService.GetAllGoodsReceipt().subscribe((response) => {
      this.dataSource.data = response;
    },
    (error) => {
      console.error('Error fetching Goods Receipt ', error);
    });
  }

  deleteGoodsReceipt(id: string){
    if(id) {
      this.goodsReceiptService.deleteGoodsReceipt(id).subscribe(
        (response) => {
          console.log('Goods Receipt deleted successfully');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting Goods Receipt:', error);
        }
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete Goods Receipt because id is undefined.');
    }
  }

  openAddGoodsReceiptDialog(){
    const dialogRef= this.dialog.open(AddGoodsReceiptComponent, {
      width: '400px',
      data: { newGoodsReceipt: this.newGoodsReceipt }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Goods Receipt saved' , result);
        this.ngOnInit();
      }
    })
  }

  openEditGoodsReceipt(goodsReceipt: GoodsReceiptDTO){
    this.editGoodsReceipt = { ...goodsReceipt}
    const dialogRef = this.dialog.open(EditGoodsReceiptComponent, {
      width: '400px',
      data: { editGoodsReceipt: this.editGoodsReceipt}
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        console.log('Goods Receipt Updated', result);

        const index = this.goodsReceiptData.findIndex(s => s.receiptNumber === result.receiptNumber);
        this.goodsReceiptData[index] = result;
        this.ngOnInit();
      }
    })
  }

  openInventoryDialog(  ){
    const dialogRef = this.dialog.open( InventoryComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Inventory Saved' , result);
        this.ngOnInit();
      }
    })
  }



}
