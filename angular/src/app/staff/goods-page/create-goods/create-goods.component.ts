import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoodsService } from '../../../API/Staff/goods/goods.service';
import { AuthenticationService } from '../../../API/authentication.service';
import { GoodsDTO } from '../../../API/Staff/goods/model';
import { GoodsGroupService } from '../../../API/Staff/Goods Group/goodsGroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-goods',
  templateUrl: './create-goods.component.html',
  styleUrl: './create-goods.component.scss'
})
export class CreateGoodsComponent implements OnInit {

  form: FormGroup;

  storeId : string | null = null;

  selectedFile: File | null = null;

  groupList: { groupId: string; groupName: string }[] = [];
  

  constructor(
    public dialogRef: MatDialogRef<CreateGoodsComponent>,
    private goodService: GoodsService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private goodGroupService: GoodsGroupService,
    private snackBar: MatSnackBar,
    
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    this.getAllGoodGroup();
  }

  buildForm(){
    this.form = this.fb.group({
      groupId: [''],
      goodsName: ['', [Validators.required]],
      goodsBrand: ['', [Validators.required]],
      goodsStatus: ['', [Validators.required]],
      storeId: [this.storeId],
      file: ['', [Validators.required]],
    });
  }
  getAllGoodGroup() {
    if (this.storeId) {
      this.goodGroupService.GetAllGoodsGroup(this.storeId).subscribe((response) => {
        this.groupList = response; // Assuming response is an array of groups
      });
    }
  }

  onGroupChange(event: any) {
    const selectedGroupId = event.target.value;
    this.form.patchValue({ groupId: selectedGroupId });
  }

  Save(){
    if (this.form.valid && this.selectedFile) {
      const goodsData: GoodsDTO = this.form.value;
      this.goodService.createProduct(goodsData, this.selectedFile).subscribe(
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
