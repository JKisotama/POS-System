import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { SellPriceService } from '../../../API/Admin/Sell Price/sellPrice.service';
import { SellPriceDTO } from '../../../API/Admin/Sell Price/model';

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
      this.sellPriceService.createSellPrice(sellPriceData).subscribe((response) => {
        this.dialogRef.close(true);
      },
    (error) => {
      console.error('Error creating goods:', error);
    })
    }
  }

  onCancel(){
    this.dialogRef.close(false);
  }

}
