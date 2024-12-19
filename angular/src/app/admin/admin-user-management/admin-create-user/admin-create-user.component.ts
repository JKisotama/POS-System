import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../API/Staff/user/user.service';
import { AdminUserService } from '../../../API/Admin/users/user.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrl: './admin-create-user.component.scss'
})
export class AdminCreateUserComponent implements OnInit {

 form: FormGroup;
 
   storeId: string | null = null;
 
   constructor(
     public dialogRef: MatDialogRef<AdminCreateUserComponent>,
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
       address: [''],
       email: [''],
       phone: [''],
       dob: [''],
       gender: [''],
       userLevel: [1],
       userStatus: ['', [Validators.required]],
     })
   }
 
   Save(){
     if(this.form.valid){
         this.adminUserService.CreateUser(this.form.value).subscribe(() => {
           this.dialogRef.close(true);
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
