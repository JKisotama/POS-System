import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDTO } from '../../API/Admin/Customer/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../API/Admin/Customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  dataSource = new MatTableDataSource<CustomerDTO>();

  form: FormGroup;

  displayedColumns: string[] = ['action', 'companyId', 'customerId', 'customerName', 'customerAddress', 'customerPhone', 'customerEmail'];


  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      companyId: ['', [Validators.required]],
    });
  }

  getCustomerByCompanyId() {
    const companyId = this.form.get('companyId')?.value;

    if (!companyId) {
      this.snackBar.open('Please Search Customer by CompanyId.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return; // Stop execution if no companyId is provided
    }
  
    this.customerService.GetAllCustomer(companyId).subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      (error) => {
        this.snackBar.open('Error fetching customers.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  openCreateCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Created new Customer successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
        });
        this.getCustomerByCompanyId();
      }
    })
  }

  openEditCustomer(customer: CustomerDTO){
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: { customer }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.snackBar.open('Updated Customer successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
        });
        this.getCustomerByCompanyId();
      }
    })
  }

  confirmDelete(customer: CustomerDTO): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-dialog-container',

    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.deleteCustomer(customer);
      } else {
        this.snackBar.open('Delete operation canceled', '', {
          duration: 2000,
          panelClass: ['snackbar-error'],
        });
      }
    })
  }

  deleteCustomer(customer: CustomerDTO): void{
    if(customer.companyId && customer.customerId) {
      this.customerService.deleteCustomer(customer.companyId, customer.customerId).subscribe({
        next: () => {
          this.snackBar.open('Customer deleted successfully', '', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.getCustomerByCompanyId();
        },
        error: () => {
          this.snackBar.open('Error while deleting Customer', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        },
      })
    }
  }



}
