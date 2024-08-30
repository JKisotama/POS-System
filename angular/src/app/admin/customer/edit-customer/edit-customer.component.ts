import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerDTO } from '../../../API/Admin/Customer/model';
import { CustomerService } from '../../../API/Admin/Customer/customer.service';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent {

  editCustomer: CustomerDTO;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editCustomer : CustomerDTO},
    private customerService: CustomerService

  ){
    this.editCustomer = { ...data.editCustomer }
  }

  onSave(){
    this.customerService.updateCustomer(this.editCustomer).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating Customer' , error);
      }
    );
  }
  onCancel() {
    this.dialogRef.close();
  }
}
