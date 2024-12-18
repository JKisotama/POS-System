import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { SupplierService } from '../../../API/Staff/Supplier/supplier.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupplierDTO } from '../../../API/Staff/Supplier/model';

@Component({
  selector: 'app-admin-edit-supplier',
  templateUrl: './admin-edit-supplier.component.html',
  styleUrl: './admin-edit-supplier.component.scss'
})
export class AdminEditSupplierComponent implements OnInit{

  form: FormGroup;
    storeId: string | null = null;
  
    constructor(
      public dialogRef: MatDialogRef<AdminEditSupplierComponent>,
      private authenticationService: AuthenticationService,
      private fb: FormBuilder,
      private supplierService: SupplierService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: {supplier?: SupplierDTO},
    ) { }
    
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.buildForm();
    }
  
    buildForm() {
      this.form = this.fb.group({
        supplierId: [this.data.supplier?.supplierId],
        supplierName: [this.data.supplier?.supplierName, [Validators.required]],
        supplierType: [this.data.supplier?.supplierType, Validators.required],
        supplierAddress: [this.data.supplier?.supplierAddress, [Validators.required]],
        supplierPhone: [this.data.supplier?.supplierPhone, [Validators.required]],
        supplierEmail: [this.data.supplier?.supplierEmail, [Validators.required]],
        storeId: [this.storeId],
        createdDate: [this.getCurrentDate()]
      })
    }
  
    getCurrentDate(): string {
      return new Date().toISOString(); // Returns the date in ISO format
    }
  
    Save() {
      if(this.form.valid){
        this.supplierService.updateSupplier(this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        },
      (error) => {
        this.snackBar.open('Error Updating Supplier.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error']
        });
        this.dialogRef.close(false);
      });
      } else {
        // Handle invalid form fields
        const invalidFields = Object.keys(this.form.controls).filter(
          (key) => this.form.get(key)?.invalid
        );
    
        let errorMessage = 'Please fill in all required fields: ';
        invalidFields.forEach((field, index) => {
          errorMessage += `${field}${index < invalidFields.length - 1 ? ', ' : ''}`;
        });
    
        this.snackBar.open(errorMessage, 'Close', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error']
        });
      }
    }
  
    onCancel() {
      this.dialogRef.close(false);
    }
}
