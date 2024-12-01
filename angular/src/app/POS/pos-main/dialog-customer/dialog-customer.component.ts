import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDTO } from '../../../API/Admin/Customer/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../API/Admin/Customer/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-dialog-customer',
  templateUrl: './dialog-customer.component.html',
  styleUrl: './dialog-customer.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class DialogCustomerComponent implements OnInit {

  dataSource = new MatTableDataSource<CustomerDTO>();
  form: FormGroup;

  displayedColumns: string[] = ['select', 'action', 'companyId', 'customerId', 'customerName', 'customerAddress', 'customerPhone', 'customerEmail'];
  selectedCustomer: CustomerDTO | null = null; 
  
  constructor(
    public dialogRef: MatDialogRef<DialogCustomerComponent>,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      companyId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      customerAddress: ['', [Validators.required]],
      customerPhone: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      createdDate: [this.getCurrentDate(), [Validators.required]]
    });
  }

  getCustomerByCompanyId() {
    const companyId = this.form.get('companyId')?.value;

    this.customerService.GetAllCustomer(companyId).subscribe((response) => {
      this.dataSource.data = response;
    });
  }
  getCurrentDate(): string {
    return new Date().toISOString(); // Returns the date in ISO format
  }

  Save() {
    if (this.form.valid) {
      this.customerService.createCustomer(this.form.value).subscribe({
        next: () => {
          // Show success notification
          this.showNotification('Customer created successfully!', 'success');
          this.form.reset(); // Clear the form
          this.form.markAsPristine(); // Ensure form state is pristine
          this.form.markAsUntouched(); // Reset touched state
        },
        error: (err) => {
          // Show error notification
          this.showNotification('Failed to create customer. Please try again.', 'error');
          console.error(err); // Log error for debugging
        }
      });
    } else {
      this.showNotification('Please fill in all required fields.', 'error');
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  
  onRowSelect(customer: CustomerDTO, isChecked: boolean): void {
    if (isChecked) {
      this.selectedCustomer = customer; // Select the new customer
    } else {
      this.selectedCustomer = null; // Deselect the customer
    }
  }

  saveSelectedCustomer(): void {
    if (this.selectedCustomer) {
      this.dialogRef.close(this.selectedCustomer);
    } else {
      this.showNotification('No customer selected.', 'error');
    }
  }




}
