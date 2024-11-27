import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GoodsService } from '../../../API/Admin/goods/goods.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { GoodsDTO } from '../../../API/Admin/goods/model';

@Component({
  selector: 'app-create-goods',
  templateUrl: './create-goods.component.html',
  styleUrl: './create-goods.component.scss'
})
export class CreateGoodsComponent implements OnInit {

  form: FormGroup;

  storeId : string | null = null;

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateGoodsComponent>,
    private goodService: GoodsService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      groupId: ['', [Validators.required]],
      goodsName: ['', [Validators.required]],
      goodsBrand: ['', [Validators.required]],
      goodsStatus: ['', [Validators.required]],
      storeId: [this.storeId, [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  Save(){
    if (this.form.valid && this.selectedFile) {
      const goodsData: GoodsDTO = this.form.value;
      this.goodService.createProduct(goodsData, this.selectedFile).subscribe(
        (response) => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error creating goods:', error);
        }
      );
    }
  }
  

  onCancel(){
    this.dialogRef.close(false);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

}
