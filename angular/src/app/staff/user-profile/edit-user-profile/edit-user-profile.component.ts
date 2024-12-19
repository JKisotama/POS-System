import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDTO } from '../../../API/Admin/users/model';
import { UserService } from '../../../API/Staff/user/user.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.scss'
})
export class EditUserProfileComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;
  selectedFile: File;

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user?: UserDTO}
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      fullName: [this.data.user?.fullName, [Validators.required]],
      address: [this.data.user?.address, [Validators.required]],
      phone: [this.data.user?.phone, [Validators.required]],
      doB: [this.data.user?.doB, [Validators.required]],
      email: [this.data.user?.email, [Validators.required]],
      gender: [this.data.user?.gender, [Validators.required]],
      image: [this.data.user?.picture],
      storeId: [this.storeId],
      loginName: [this.data.user?.loginName],
    })
  }

  Save(){
    if(this.form.valid){
        this.userService.updateUser(this.form.value, this.selectedFile).subscribe(() => {
          this.dialogRef.close(true);
        },
      (error) => {
        this.snackBar.open('Error Updating Information.', 'Close', {
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
