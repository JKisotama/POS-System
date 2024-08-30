import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoodsUnitDTO } from '../../../../API/Admin/Goods Unit/model';
import { GoodsUnitService } from '../../../../API/Admin/Goods Unit/goodsUnit.service';


@Component({
  selector: 'app-edit-goods-unit',
  templateUrl: './edit-goods-unit.component.html',
  styleUrl: './edit-goods-unit.component.scss'
})
export class EditGoodsUnitComponent implements OnInit{

  editGoodsUnit: GoodsUnitDTO;

  constructor(
    public dialogRef: MatDialogRef<EditGoodsUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editGoodsUnit: GoodsUnitDTO},
    private goodsUnitService: GoodsUnitService
  ){
    this.editGoodsUnit = { ...data.editGoodsUnit}
  }
  ngOnInit(): void {
    
  }

  onSave() {
    this.goodsUnitService.updateGoodsUnit(this.editGoodsUnit).subscribe(
      (response) => {
        this.dialogRef.close(response);

      },
      (error) => {
        console.error('Error updating Goods Unit:', error);
      }
    )
  }
  onCancel() {
    this.dialogRef.close();
  }
}
