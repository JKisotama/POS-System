import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoodsGroupService } from '../../../API/Admin/Goods Group/goodsGroup.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoodsGroupDTO } from '../../../API/Admin/Goods Group/model';

@Component({
  selector: 'app-edit-good-group',
  templateUrl: './edit-good-group.component.html',
  styleUrl: './edit-good-group.component.scss'
})
export class EditGoodGroupComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditGoodGroupComponent>,
    private goodGroupService: GoodsGroupService,
    private authenticationService: AuthenticationService,
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {goodGroup?: GoodsGroupDTO},
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      storeId: [this.storeId],
      groupId: [this.data.goodGroup?.groupId],
      groupName: [this.data.goodGroup?.groupName, [Validators.required]],
      groupStatus: [this.data.goodGroup?.groupStatus, [Validators.required]],
    });
  }

  Save(){
    if(this.form.valid){
      this.goodGroupService.updateGoodsGroup(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      },
    (error) => {
      this.snackBar.open('Error creating Good Group.', 'Close', {
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
