import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertyGroupService } from '../../../API/Admin/Property Group/propertyGroup.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';

@Component({
  selector: 'app-create-property-group',
  templateUrl: './create-property-group.component.html',
  styleUrl: './create-property-group.component.scss'
})
export class CreatePropertyGroupComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreatePropertyGroupComponent>,
    private propertyGroupService: PropertyGroupService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    
  }

  buildForm(){
    this.form = this.fb.group({
      storeId: [this.storeId, [Validators.required]],
      propertyId: ['', [Validators.required]],
      propertyName: ['', [Validators.required]],
    })
  }

  Save(){
    this.propertyGroupService.createPropertyGroup(this.form.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(){
    this.dialogRef.close(false);
  }

}
