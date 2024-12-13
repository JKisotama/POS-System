import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDTO } from '../../API/Admin/Customer/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../API/Admin/Customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

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

    this.customerService.GetAllCustomer(companyId).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  openCreateCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCustomerByCompanyId();
      }
    })
  }

}
