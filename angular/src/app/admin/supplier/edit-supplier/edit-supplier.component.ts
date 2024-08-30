import { Component , OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierDTO } from '../../../API/Admin/Supplier/model';
import { SupplierService } from '../../../API/Admin/Supplier/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.scss'
})
export class EditSupplierComponent implements OnInit {

  editSupplier: SupplierDTO;

  constructor(
    public dialogRef: MatDialogRef<EditSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editSupplier: SupplierDTO},
    private supplierService: SupplierService
  ){
    this.editSupplier = { ...data.editSupplier};
  }

  ngOnInit(): void {
    
  }

  onSave(){
    this.supplierService.updateSupplier(this.editSupplier).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error Updating Supplier', error);
      }
    );
  }

  onCancel(){
    this.dialogRef.close();
  }
}
