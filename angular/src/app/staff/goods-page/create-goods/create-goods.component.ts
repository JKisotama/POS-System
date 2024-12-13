import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GoodsService } from '../../../API/Admin/goods/goods.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { GoodsDTO } from '../../../API/Admin/goods/model';
import { GoodsGroupService } from '../../../API/Admin/Goods Group/goodsGroup.service';

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
    private goodGroupService: GoodsGroupService
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    this.getAllGoodGroup();
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
