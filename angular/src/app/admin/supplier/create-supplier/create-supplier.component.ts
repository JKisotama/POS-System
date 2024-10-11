import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { SupplierService } from '../../../API/Admin/Supplier/supplier.service';

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
    private supplierService: SupplierService

  ) { }

  ngOnInit(): void {
    this.storeId = this.authentication.getStoreIdUser();
    this.buildForm();
    console.log(this.storeId);
  }

  buildForm() {
    this.form = this.fb.group({
      supplierId: ['', [Validators.required]],
      supplierName: ['', [Validators.required]],
      supplierType: ['', Validators.required],
      supplierAddress: ['', [Validators.required]],
      supplierPhone: ['', [Validators.required]],
      supplierEmail: ['', [Validators.required]],
      storeId: [this.storeId, [Validators.required]],
      createdDate: [this.getCurrentDate(), [Validators.required]]
    })
  }

  getCurrentDate(): string {
    return new Date().toISOString(); // Returns the date in ISO format
  }

  Save() {
    this.supplierService.createSupplier(this.form.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }



}
