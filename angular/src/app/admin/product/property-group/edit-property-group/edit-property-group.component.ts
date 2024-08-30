import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropertyGroupDTO } from '../../../../API/Admin/Property Group/model';
import { PropertyGroupService } from '../../../../API/Admin/Property Group/propertyGroup.service';



@Component({
  selector: 'app-edit-property-group',
  templateUrl: './edit-property-group.component.html',
  styleUrl: './edit-property-group.component.scss'
})
export class EditPropertyGroupComponent implements OnInit{

  editPropertyGroup: PropertyGroupDTO;

  constructor(
    public dialogRef: MatDialogRef<EditPropertyGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {editPropertyGroup: PropertyGroupDTO},
    private propertyGroupService: PropertyGroupService
  ){
    this.editPropertyGroup = { ...data.editPropertyGroup}
  }

  ngOnInit(): void {
    
  }

  onSave(){
    this.propertyGroupService.updatePropertyGroup(this.editPropertyGroup).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        console.error('Error Updating Property Group', error);
      }
    )
  }

  onCancel(){
    this.dialogRef.close();
  }

}
