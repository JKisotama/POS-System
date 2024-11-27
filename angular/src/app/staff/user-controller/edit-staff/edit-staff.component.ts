import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffDTO } from '../../../API/Admin/Staff/model';
import { StaffService } from '../../../API/Admin/Staff/staff.service';



@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.scss'
})
export class EditStaffComponent implements OnInit {

  editStaff: StaffDTO;
  
  constructor(
    public dialogRef: MatDialogRef<EditStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editStaff: StaffDTO },
    private staffService: StaffService
  ) {
    this.editStaff = { ...data.editStaff };
  }

  ngOnInit() {
  }

  onSave() {
    this.staffService.updateStaff(this.editStaff).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating staff:', error);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}
