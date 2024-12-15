import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateGoodPropertyComponent } from '../create-good-property/create-good-property.component';
import { GoodsPropertyDTO } from '../../../../API/Admin/Goods Property/model';
import { AuthenticationService } from '../../../../API/Admin/authentication.service';
import { GoodsPropertyService } from '../../../../API/Admin/Goods Property/goodsProperty.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-good-property',
  templateUrl: './edit-good-property.component.html',
  styleUrl: './edit-good-property.component.scss'
})
export class EditGoodPropertyComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<CreateGoodPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goodProperty?: GoodsPropertyDTO },
    private fb: FormBuilder,
    private authenticationService : AuthenticationService,
    private goodPropertyService: GoodsPropertyService,
    private snackBar: MatSnackBar,
  ){} 


  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      goodsId: [this.data.goodProperty?.goodsId],
      storeId: [this.storeId],
      propertyId: [this.data.goodProperty?.propertyId],
      propertyName: ['', [Validators.required]],
    });
  }
  
  save(){
    if(this.form.valid){
      const goodPropertyData: GoodsPropertyDTO = this.form.value;
      this.goodPropertyService.updateGoodsProperty(goodPropertyData).subscribe(() => {
        this.dialogRef.close(true);
      },
    (error) => {
      console.error('Error Updating Good Property:', error);
      this.snackBar.open('Error Updating Good Property.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['snackbar-error']
      });
      this.dialogRef.close(false);
    })
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
