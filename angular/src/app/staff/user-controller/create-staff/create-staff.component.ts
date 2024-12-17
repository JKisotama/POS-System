import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StaffDTO } from '../../../API/Staff/Staff/model';
import { StaffService } from '../../../API/Staff/Staff/staff.service';
import { UserService } from '../../../API/Staff/user/user.service';


@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss'
})
export class CreateStaffComponent implements OnInit {

  form: FormGroup;

  
  constructor(
    public dialogRef: MatDialogRef<CreateStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private fb: FormBuilder,


  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      storeId: ['', [Validators.required]],
      loginName: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      passWord: ['', [Validators.required]],
    })
  }

  Save(){
    this.userService.CreateUser(this.form.value).subscribe(() => {
      this.dialogRef.close();
    })
  }
  

  

  onCancel() {
    this.dialogRef.close();
  }
}
