import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../../API/authentication.service';
import { GoodsPropertyService } from '../../../../API/Staff/Goods Property/goodsProperty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoodsPropertyDTO } from '../../../../API/Staff/Goods Property/model';
import { PropertyGroupService } from '../../../../API/Staff/Property Group/propertyGroup.service';

@Component({
  selector: 'app-create-good-property',
  templateUrl: './create-good-property.component.html',
  styleUrl: './create-good-property.component.scss'
})
export class CreateGoodPropertyComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;
  propertyGroupList: { propertyId: string; propertyName: string } [] = []

  constructor(
    private dialogRef: MatDialogRef<CreateGoodPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goodsId: string },
    private fb: FormBuilder,
    private authenticationService : AuthenticationService,
    private goodPropertyService: GoodsPropertyService,
    private propertyGroupService: PropertyGroupService,
    private snackBar: MatSnackBar,
  ){} 

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    this.getAllPropertyGroup();
  }

  buildForm(){
    this.form = this.fb.group({
      goodsId: [this.data.goodsId],
      storeId: [this.storeId],
      propertyId: ['', [Validators.required]],
      propertyName: ['', [Validators.required]],
    });
  }

  save(){
    if(this.form.valid){
      const goodPropertyData: GoodsPropertyDTO = this.form.value;
      this.goodPropertyService.createGoodsProperty(goodPropertyData).subscribe(() => {
        this.dialogRef.close(true);
      },
    (error) => {
      console.error('Error creating Good Property:', error);
      this.snackBar.open('Error creating Good Property.', 'Close', {
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

  getAllPropertyGroup(){
    if (this.storeId) {
      this.propertyGroupService.GetAllPropertyGroup(this.storeId).subscribe((response) => {
        this.propertyGroupList = response;
      })
    }
  }

  onPropertyGroupChange(event: any) {
    const selectedPropertyId = event.target.value;
    this.form.patchValue({ popertyId: selectedPropertyId });
  }

  onCancel(){
    this.dialogRef.close(false);
  }



}
