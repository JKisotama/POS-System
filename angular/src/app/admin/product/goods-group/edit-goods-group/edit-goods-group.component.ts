import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoodsGroupDTO } from '../../../../API/Admin/Goods Group/model';
import { GoodsGroupService } from '../../../../API/Admin/Goods Group/goodsGroup.service';

@Component({
  selector: 'app-edit-goods-group',
  templateUrl: './edit-goods-group.component.html',
  styleUrl: './edit-goods-group.component.scss'
})
export class EditGoodsGroupComponent implements OnInit {

  editGoodsGroup: GoodsGroupDTO;

  constructor(
    public dialogRef: MatDialogRef<EditGoodsGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {editGoodsGroup: GoodsGroupDTO},
    private goodsGroupService: GoodsGroupService
  ){
    this.editGoodsGroup = {...data.editGoodsGroup}
  }

  ngOnInit(): void {
    
  }


  onSave(){
    this.goodsGroupService.updateGoodsGroup(this.editGoodsGroup).subscribe(
      (response) => {
        this.dialogRef.close(response)
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
