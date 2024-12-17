import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoodsDTO } from '../../../API/Staff/goods/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoodsService } from '../../../API/Staff/goods/goods.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { GoodsGroupService } from '../../../API/Staff/Goods Group/goodsGroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-goods',
  templateUrl: './edit-goods.component.html',
  styleUrl: './edit-goods.component.scss'
})
export class EditGoodsComponent implements OnInit {

  form: FormGroup;
  
  storeId : string | null = null;
  
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditGoodsComponent>,
    private goodService: GoodsService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private goodGroupService: GoodsGroupService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {goods?: GoodsDTO},
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    
  }

  buildForm(){
      this.form = this.fb.group({
      goodsId: [this.data.goods?.goodsId],
      groupId: [this.data.goods?.groupId],
      goodsName: [this.data.goods?.goodsName, [Validators.required]],
      goodsBrand: [this.data.goods?.goodsBrand, [Validators.required]],
      goodsStatus: [this.data.goods?.goodsStatus, [Validators.required]],
      storeId: [this.storeId],
     
    });
  }

  Save(){
    if (this.form.valid && this.selectedFile) {
      const goodsData: GoodsDTO = this.form.value;
      this.goodService.updateProduct(goodsData, this.selectedFile).subscribe(
        (response) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error creating Good.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-error']
          });
          this.dialogRef.close(false);
        }
      );
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }



}
