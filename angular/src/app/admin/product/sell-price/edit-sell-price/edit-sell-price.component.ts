import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SellPriceDTO } from '../../../../API/Admin/Sell Price/model';
import { SellPriceService } from '../../../../API/Admin/Sell Price/sellPrice.service';




@Component({
  selector: 'app-edit-sell-price',
  templateUrl: './edit-sell-price.component.html',
  styleUrl: './edit-sell-price.component.scss'
})
export class EditSellPriceComponent implements OnInit{


  editSellPrice: SellPriceDTO;

  constructor(
    public dialogRef: MatDialogRef<EditSellPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editSellPrice: SellPriceDTO},
    private sellPriceService: SellPriceService
  ){
    this.editSellPrice = { ...data.editSellPrice};
  }

  ngOnInit(): void {
    
  }

  onSave(){
    this.sellPriceService.updateSellPrice(this.editSellPrice).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating Sell Price:', error);
      }
    )
  }
  onCancel() {
    this.dialogRef.close();
  }
}
