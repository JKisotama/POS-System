import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertyGroupService } from '../../../API/Staff/Property Group/propertyGroup.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-create-property-group',
  templateUrl: './admin-create-property-group.component.html',
  styleUrl: './admin-create-property-group.component.scss'
})
export class AdminCreatePropertyGroupComponent implements OnInit {


  form: FormGroup;
    storeId: string | null = null;
  
    constructor(
      public dialogRef: MatDialogRef<AdminCreatePropertyGroupComponent>,
      private propertyGroupService: PropertyGroupService,
      private authenticationService: AuthenticationService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
    ){}
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.buildForm();
      
    }
  
    buildForm(){
      this.form = this.fb.group({
        storeId: [this.storeId],
        propertyId: [''],
        propertyName: ['', [Validators.required]],
      })
    }
  
    Save(){
      if(this.form.valid){
        this.propertyGroupService.createPropertyGroup(this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        },
      (error) => {
        this.snackBar.open('Error creating Property Group.', 'Close', {
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
  
    onCancel(){
      this.dialogRef.close(false);
    }
  
}