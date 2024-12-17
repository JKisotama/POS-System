import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../API/Staff/Customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDTO } from '../../../API/Staff/Customer/model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {customer?: CustomerDTO},
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      customerId: [this.data.customer?.customerId],
      customerName: [this.data.customer?.customerName, [Validators.required]],
      customerAddress: [this.data.customer?.customerAddress, [Validators.required]],
      customerPhone: [this.data.customer?.customerPhone, [Validators.required]],
      customerEmail: [this.data.customer?.customerEmail, [Validators.required]],
      companyId: [this.data.customer?.companyId],
      createdDate: [this.getCurrentDate(), [Validators.required]]
    });
  }

  getCurrentDate(): string {
    return new Date().toISOString(); // Returns the date in ISO format
  }

  Save() {
    if(this.form.valid){
      this.customerService.updateCustomer(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      },
    (error) => {
      this.snackBar.open('Error creating Customer.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['snackbar-error']
      });
      this.dialogRef.close(false);
    })
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
