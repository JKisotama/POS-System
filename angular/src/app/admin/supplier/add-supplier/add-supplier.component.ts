import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { SupplierDTO } from '../../../API/Admin/Supplier/model';
import { SupplierService } from '../../../API/Admin/Supplier/supplier.service';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.scss'
})
export class AddSupplierComponent {

  newSupplier: SupplierDTO = {
    supplierId: '',
    supplierName: '',
    supplierType: '',
    supplierAddress: '',
    supplierPhone: '',
    supplierEmail: ''
  }

  constructor(
    public dialogRef: MatDialogRef<AddSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private supplierService: SupplierService
  ){}

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.supplierService.createSupplier(this.newSupplier).subscribe(
        (response) => {
          console.log('New Supplier Created' , response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error Creating new Supplier', error);
        }
      )
    }
  }
  onCancel(){
    this.dialogRef.close();
  }
}
