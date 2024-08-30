import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CustomerDTO } from '../../../API/Admin/Customer/model';
import { CustomerService } from '../../../API/Admin/Customer/customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {

  newCustomer: CustomerDTO = {
    customerId: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: ''
  }

  constructor(
    public dialogRef : MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private customerService : CustomerService
  ){}

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.customerService.createCustomer(this.newCustomer).subscribe(
        (response) => {
          console.log('New Customer created' , response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.log('Error creating new customer', error);
        }
      )
    }
  }
  onCancel() {
    this.dialogRef.close();
  }

}
