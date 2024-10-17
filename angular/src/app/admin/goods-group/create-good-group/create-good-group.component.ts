import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GoodsGroupService } from '../../../API/Admin/Goods Group/goodsGroup.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';

@Component({
  selector: 'app-create-good-group',
  templateUrl: './create-good-group.component.html',
  styleUrl: './create-good-group.component.scss'
})
export class CreateGoodGroupComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;


  constructor(
    public dialogRef: MatDialogRef<CreateGoodGroupComponent>,
    private goodGroupService: GoodsGroupService,
    private authenticationService: AuthenticationService,
    private fb : FormBuilder,
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      storeId: [this.storeId, [Validators.required]],
      groupId: ['', [Validators.required]],
      groupName: ['', [Validators.required]],
      groupStatus: ['', [Validators.required]],
    })
  }

  Save(){
    this.goodGroupService.createGoodsGroup(this.form.value).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  onCancel(){
    this.dialogRef.close(false);
  }
}
