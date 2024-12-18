import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.scss'
})
export class EditStaffComponent implements OnInit {

 
  
  constructor(
    public dialogRef: MatDialogRef<EditStaffComponent>,
  ) {
  }

  ngOnInit() {
  }

  

  onCancel() {
    this.dialogRef.close();
  }

}
