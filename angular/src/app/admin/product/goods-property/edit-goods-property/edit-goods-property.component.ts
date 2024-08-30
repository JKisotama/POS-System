import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoodsPropertyDTO } from '../../../../API/Admin/Goods Property/model';
import { GoodsPropertyService } from '../../../../API/Admin/Goods Property/goodsProperty.service';

@Component({
  selector: 'app-edit-goods-property',
  templateUrl: './edit-goods-property.component.html',
  styleUrl: './edit-goods-property.component.scss'
})
export class EditGoodsPropertyComponent implements OnInit {

  editGoodsProperty: GoodsPropertyDTO;

  constructor(
    public dialogRef: MatDialogRef<EditGoodsPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editGoodsProperty: GoodsPropertyDTO},
    private goodsPropertyService : GoodsPropertyService
  ){
    this.editGoodsProperty = { ...data.editGoodsProperty}
  }

  ngOnInit(): void {
    
  }

  onSave(){
    this.goodsPropertyService.updateGoodsProperty(this.editGoodsProperty).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating Goods Property:', error);
      }
    )
  }
  onCancel() {
    this.dialogRef.close();
  }

}
