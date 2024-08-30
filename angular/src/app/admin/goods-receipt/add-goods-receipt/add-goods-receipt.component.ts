import { Component , Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgForm } from '@angular/forms';
import { GoodsReceiptDTO } from '../../../API/Admin/Goods Receipt/model';
import { GoodsReceiptService } from '../../../API/Admin/Goods Receipt/goodsReceipt.service';
import { SupplierDTO } from '../../../API/Admin/Supplier/model';
import { SupplierService } from '../../../API/Admin/Supplier/supplier.service';

@Component({
  selector: 'app-add-goods-receipt',
  templateUrl: './add-goods-receipt.component.html',
  styleUrl: './add-goods-receipt.component.scss'
})
export class AddGoodsReceiptComponent implements OnInit {

  newGoodsReceipt: GoodsReceiptDTO = {
    dateReceipt: '',
    receiptNumber: '',
    supplier: '',
    totalAmount: '',
    inDept: '',
    status: ''
  }

  suppliers: SupplierDTO[] = [];


  constructor(
    public dialogRef: MatDialogRef<AddGoodsReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private goodsReceiptService: GoodsReceiptService,
    private supplierService: SupplierService

  ){
    
  }
  
  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.supplierService.GetAllSupplier().subscribe((response) => {
      this.suppliers = response;
    }, (error) => {
      console.error('Error fetching Suppliers', error);
    });
  }



  onSubmit(form: NgForm) {
    if(form.valid) {
      this.goodsReceiptService.createGoodsReceipt(this.newGoodsReceipt).subscribe(
        (response) => {
          console.log('New Goods Receipt created', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating new Goods Receipt:', error);
        }
      )
    }
  }
  onCancel() {
    this.dialogRef.close();
  }

}
