import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoodsUnitDTO } from '../../../../API/Staff/Goods Unit/model';
import { AuthenticationService } from '../../../../API/authentication.service';
import { GoodsUnitService } from '../../../../API/Staff/Goods Unit/goodsUnit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-good-unit',
  templateUrl: './edit-good-unit.component.html',
  styleUrl: './edit-good-unit.component.scss'
})
export class EditGoodUnitComponent implements OnInit {


  form: FormGroup;
  storeId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditGoodUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goodsUnit?: GoodsUnitDTO },
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private goodsUnitService: GoodsUnitService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      goodsId: [this.data.goodsUnit?.goodsId],
      barcode: [this.data.goodsUnit?.barcode, [Validators.required]],
      goodsUnit: [this.data.goodsUnit?.goodsUnit, [Validators.required]],
      unitSize: [this.data.goodsUnit?.unitSize, [Validators.required]],
      unitStatus: [this.data.goodsUnit?.unitStatus, [Validators.required]],
      unitStock: [this.data.goodsUnit?.unitStock, [Validators.required]],
      storeId: [this.storeId],
    });
  }

  Save(){
    if(this.form.valid){
      this.goodsUnitService.updateGoodsUnit(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error creating Sell Price for Good:', error);
        this.snackBar.open('Error creating sell price.', 'Close', {
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
