import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertyGroupService } from '../../../API/Staff/Property Group/propertyGroup.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyGroupDTO } from '../../../API/Staff/Property Group/model';

@Component({
  selector: 'app-admin-edit-property-group',
  templateUrl: './admin-edit-property-group.component.html',
  styleUrl: './admin-edit-property-group.component.scss'
})
export class AdminEditPropertyGroupComponent {

  form: FormGroup;
      
    storeId : string | null = null;
  
    constructor(
      public dialogRef: MatDialogRef<AdminEditPropertyGroupComponent>,
      private propertyGroupService: PropertyGroupService,
      private authenticationService: AuthenticationService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: {propertyGroup?: PropertyGroupDTO},
    ){}
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.buildForm();
    }
  
    buildForm(){
      this.form = this.fb.group({
        storeId: [this.storeId],
        propertyId: [this.data.propertyGroup?.propertyId],
        propertyName: [this.data.propertyGroup?.propertyName, [Validators.required]],
      })
    }
  
  
    Save(){
      if(this.form.valid){
        this.propertyGroupService.updateGroupProperty(this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error updating Property Group.', 'Close', {
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
