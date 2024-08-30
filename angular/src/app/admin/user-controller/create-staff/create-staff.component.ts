import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { StaffDTO } from '../../../API/Admin/Staff/model';
import { StaffService } from '../../../API/Admin/Staff/staff.service';


@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.scss'
})
export class CreateStaffComponent {

  newStaff: StaffDTO = {
    code: '',
    name: '',
    age: '',
    role: '',
    department: ''
  };
  constructor(
    public dialogRef: MatDialogRef<CreateStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private staffService: StaffService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.staffService.createStaff(this.newStaff).subscribe(
        (response) => {
          console.log('New staff created:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating new staff:', error);
        }
      );
    } 
  }

  onCancel() {
    this.dialogRef.close();
  }
}
