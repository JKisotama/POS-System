import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../../API/authentication.service';
import { GoodsUnitService } from '../../../../API/Staff/Goods Unit/goodsUnit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-good-unit',
  templateUrl: './create-good-unit.component.html',
  styleUrl: './create-good-unit.component.scss'
})
export class CreateGoodUnitComponent implements OnInit {
form: FormGroup;

  storeId: string | null = null;
   

  constructor(
    public dialogRef: MatDialogRef<CreateGoodUnitComponent>,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private goodsUnitService: GoodsUnitService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { goodsId: string },
  ){}
  
  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      goodsId: [this.data.goodsId],
      barcode: ['', [Validators.required]],
      goodsUnit: ['', [Validators.required]],
      unitSize: ['', [Validators.required]],
      unitStatus: ['', [Validators.required]],
      unitStock: ['', [Validators.required]],
      storeId: [this.storeId],
    });
  }

  Save(){
    if(this.form.valid){
      this.goodsUnitService.createGoodsUnit(this.form.value).subscribe(() => {
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
