import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../API/Admin/Customer/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateCustomerComponent>,
    private customerService: CustomerService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      customerId: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]],
      customerPhone: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      companyId: ['', [Validators.required]],
      createdDate: [this.getCurrentDate(), [Validators.required]]
    });
  }

  getCurrentDate(): string {
    return new Date().toISOString(); // Returns the date in ISO format
  }

  Save() {
    this.customerService.createCustomer(this.form.value).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
