import { Component, OnInit } from '@angular/core';
import { CustomerDTO } from '../../API/Admin/Customer/model';
import { CustomerService } from '../../API/Admin/Customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  customerData: CustomerDTO[] = [];

  newCustomer: CustomerDTO = {
    customerId: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: ''
  }

  editCustomer: CustomerDTO = {
    customerId: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: ''
  }

  displayColumns: string[] = ['customerId', 'customerName', 'customerAddress' , 'customerPhone', 'customerEmail', 'action'];

  dataSource = new MatTableDataSource<CustomerDTO>();

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.customerService.GetAllCustomer().subscribe((res) => {
      this.dataSource.data = res;
    } ,
    (error) => {
      console.error('Error fetching customer ', error);
    });
  }

  deleteCustomer(id: string) {
    if (id) {
      this.customerService.deleteCustomer(id).subscribe(
        (response) => {
          console.log('Delete customer successfully');
          this.ngOnInit();
        },
        (error) => {
          console.log('Error deleting Customer' , error);
        }
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete customer because id is undefined.');
    }
  }

  openCreateCustomerDialog(){
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '400px',
      data : { newCustomer: this.newCustomer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('New Customer saved' , result);
        this.ngOnInit();
      }
    })
  }

  openEditCustomerDialog( customer: CustomerDTO){
    this.editCustomer = {...customer};
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '400px',
      data: { editCustomer: this.editCustomer}
    });
    dialogRef.afterClosed().subscribe(result=> {
      if(result) {
        console.log('Customer updated', result);

        const index = this.customerData.findIndex(s => s.customerId === result.customerId);
        this.customerData[index]= result;
        this.ngOnInit();
      }
    })
  }




  

}
