import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../../../API/Staff/Customer/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-ctm',
  templateUrl: './dialog-add-ctm.component.html',
  styleUrl: './dialog-add-ctm.component.scss'
})
export class DialogAddCtmComponent implements OnInit {


  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddCtmComponent>,
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

  getCurrentDate(): string {
    return new Date().toISOString(); // Returns the date in ISO format
  }


  Save() {
    if (this.form.valid) {
      this.customerService.createCustomer(this.form.value).subscribe({
        next: () => {
          // Show success notification
          this.showNotification('Customer created successfully!', 'success');
          this.dialogRef.close(true);
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

  showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
