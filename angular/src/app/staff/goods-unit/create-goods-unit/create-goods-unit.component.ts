import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { GoodsUnitService } from '../../../API/Staff/Goods Unit/goodsUnit.service';

@Component({
  selector: 'app-create-goods-unit',
  templateUrl: './create-goods-unit.component.html',
  styleUrl: './create-goods-unit.component.scss'
})
export class CreateGoodsUnitComponent implements OnInit {

  form: FormGroup;

  storeId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateGoodsUnitComponent>,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private goodsUnitService: GoodsUnitService,
  ){}
  
  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      goodsId: ['', [Validators.required]],
      barcode: ['', [Validators.required]],
      goodsUnit: ['', [Validators.required]],
      unitSize: ['', [Validators.required]],
      unitStatus: ['', [Validators.required]],
      unitStock: ['', [Validators.required]],
      storeId: [this.storeId, [Validators.required]],
    });
  }

  Save(){
    this.goodsUnitService.createGoodsUnit(this.form.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }


  onCancel(){
    this.dialogRef.close(false);
  }
}
