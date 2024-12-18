import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { UserService } from '../../../API/Staff/user/user.service';
import { AdminUserService } from '../../../API/Admin/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../API/authentication.service';


@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss'
})
export class CreateStaffComponent implements OnInit {

  form: FormGroup;

  storeId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminUserService: AdminUserService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      storeId: [this.storeId],
      loginName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      passWord: ['', [Validators.required]],
      userLevel: [1],
      userStatus: ['', [Validators.required]],
    })
  }

  Save(){
    if(this.form.valid){
        this.adminUserService.CreateUser(this.form.value).subscribe(() => {
          this.dialogRef.close();
        },
      (error) => {
        this.snackBar.open('Error creating Staff.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error']
        });
        this.dialogRef.close(false);
      });
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
    this.dialogRef.close();
  }
  
  
  

  

  
}
