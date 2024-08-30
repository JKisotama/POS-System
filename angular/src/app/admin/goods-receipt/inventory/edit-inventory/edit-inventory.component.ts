import { Component, Inject } from '@angular/core';
import { InventoryDTO } from '../../../../API/Admin/Inventory/model';
import { InventoryService } from '../../../../API/Admin/Inventory/inventory.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.scss'
})
export class EditInventoryComponent {

  editInventory: InventoryDTO = {
    amount: '',
    unit: '',
    goodsName: '',
    type: '',
    buyPrice: '',
    totalAmount: ''
  }

  constructor(
    public dialogRef : MatDialogRef<EditInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editInventory: InventoryDTO },
    private inventoryService: InventoryService
  ){
    this.editInventory = { ...data.editInventory}
  }

  onSave(){
    this.inventoryService.updateInventory(this.editInventory).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating Inventory', error);
      }
    );
  }
  onCancel(){
    this.dialogRef.close();
  }
}
