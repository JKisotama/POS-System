import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminUserService } from '../../../API/Admin/users/user.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDTO } from '../../../API/Admin/users/model';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrl: './admin-edit-user.component.scss'
})
export class AdminEditUserComponent implements OnInit{


  form: FormGroup;
   
     storeId: string | null = null;
   
     constructor(
       public dialogRef: MatDialogRef<AdminEditUserComponent>,
       private adminUserService: AdminUserService,
       private authenticationService: AuthenticationService,
       private fb: FormBuilder,
       private snackBar: MatSnackBar,
       @Inject(MAT_DIALOG_DATA) public data: { user?: UserDTO}
     ) {}
   
     ngOnInit(): void {
       this.storeId = this.authenticationService.getStoreIdUser();
       this.buildForm();
     }
   
     buildForm() {
       this.form = this.fb.group({
         storeId: [this.storeId],
         loginName: [this.data.user?.loginName, [Validators.required]],
         fullName: [this.data.user?.fullName, [Validators.required]],
         passWord: [this.data.user?.passWord, [Validators.required]],
         address: [this.data.user?.address],
         email: [this.data.user?.email],
         dob: [this.data.user?.doB],
         phone: [this.data.user?.phone],
         gender: [this.data.user?.gender],
         userLevel: [1],
         userStatus: [this.data.user?.userStatus, [Validators.required]],
       })
     }
   
     Save(){
       if(this.form.valid){
           this.adminUserService.UpdateUser(this.form.value).subscribe(() => {
             this.dialogRef.close(true);
           },
         (error) => {
           this.snackBar.open('Error Updating Staff.', 'Close', {
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
