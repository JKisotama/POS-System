import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../../API/Admin/authentication.service';
import { SellPriceService } from '../../../../API/Admin/Sell Price/sellPrice.service';
import { SellPriceDTO } from '../../../../API/Admin/Sell Price/model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-sell-price',
  templateUrl: './create-sell-price.component.html',
  styleUrl: './create-sell-price.component.scss'
})
export class CreateSellPriceComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<CreateSellPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goodsId: string },
    private fb: FormBuilder,
    private authenticationService : AuthenticationService,
    private sellPriceService: SellPriceService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      goodsUnit: ['', [Validators.required]],
      barCode: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      sellPrice: ['', [Validators.required]],
      goodsId: [this.data.goodsId],
      storeId: [this.storeId],
    });
  }

  save(){
    if(this.form.valid){
      const sellPriceData: SellPriceDTO = this.form.value;
      this.sellPriceService.createSellPrice(sellPriceData).subscribe(() => {
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
    })
    }  else {
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
