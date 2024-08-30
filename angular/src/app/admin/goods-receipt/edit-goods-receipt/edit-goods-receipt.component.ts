import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoodsReceiptDTO } from '../../../API/Admin/Goods Receipt/model';
import { GoodsReceiptService } from '../../../API/Admin/Goods Receipt/goodsReceipt.service';

@Component({
  selector: 'app-edit-goods-receipt',
  templateUrl: './edit-goods-receipt.component.html',
  styleUrl: './edit-goods-receipt.component.scss'
})
export class EditGoodsReceiptComponent {

  editGoodsReceipt: GoodsReceiptDTO = {
    dateReceipt: '',
    receiptNumber: '',
    supplier: '',
    totalAmount: '',
    inDept: '',
    status: ''
  }

  constructor(
    public dialogRef: MatDialogRef<EditGoodsReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editGoodsReceipt : GoodsReceiptDTO},
    private goodsReceiptService: GoodsReceiptService
  ){
    this.editGoodsReceipt = { ...data.editGoodsReceipt }
  }

  onSave(){
    this.goodsReceiptService.updateGoodsReceipt(this.editGoodsReceipt).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error Updating Goods Receipt', error);
      }
    );
  }

  onCancel(){
    this.dialogRef.close();
  }



}
