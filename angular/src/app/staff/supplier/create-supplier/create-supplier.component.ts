import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { SupplierService } from '../../../API/Staff/Supplier/supplier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.scss'
})
export class CreateSupplierComponent implements OnInit {

  form: FormGroup;

  storeId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateSupplierComponent>,
    private authentication: AuthenticationService,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.storeId = this.authentication.getStoreIdUser();
    this.buildForm();
    console.log(this.storeId);
  }

  buildForm() {
    this.form = this.fb.group({
      supplierId: [''],
      supplierName: ['', [Validators.required]],
      supplierType: ['', Validators.required],
      supplierAddress: ['', [Validators.required]],
      supplierPhone: ['', [Validators.required]],
      supplierEmail: ['', [Validators.required]],
      storeId: [this.storeId],
      createdDate: [this.getCurrentDate()]
    })
  }

  getCurrentDate(): string {
    return new Date().toISOString(); // Returns the date in ISO format
  }

  Save() {
    if(this.form.valid){
      this.supplierService.createSupplier(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      },
    (error) => {
      this.snackBar.open('Error creating Supplier.', 'Close', {
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
