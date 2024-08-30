import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { PropertyGroupDTO } from '../../../API/Admin/Property Group/model';
import { PropertyGroupService } from '../../../API/Admin/Property Group/propertyGroup.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditPropertyGroupComponent } from './edit-property-group/edit-property-group.component';
import { HeaderComponent } from '../../header/header.component';





@Component({
  selector: 'app-property-group',
  templateUrl: './property-group.component.html',
  styleUrl: './property-group.component.scss'
})
export class PropertyGroupComponent implements OnInit {

  propertyGroup: PropertyGroupDTO[];

  propertyGroupData: PropertyGroupDTO[] = [];

  newPropertyGroup: PropertyGroupDTO = { 
    propertyId: '',
    propertyName: '',
  }
  editPropertyGroup: PropertyGroupDTO = {
    propertyId: '',
    propertyName: '',
  }

  showForm = false;

  displayColumns: string[] = ['propertyId', 'propertyName', 'action'];

  dataSource = new MatTableDataSource<PropertyGroupDTO>();

  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;


  constructor(
    public dialogRef: MatDialogRef<PropertyGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { propertyGroup: PropertyGroupDTO[]},
    private propertyGroupService: PropertyGroupService,
    private dialog: MatDialog
  ){
    this.propertyGroup = data.propertyGroup;
    this.dataSource.data = this.propertyGroup;
  }

  ngOnInit(): void {
    this.getAllPropertyGroup();
  }

  getAllPropertyGroup(){
    this.propertyGroupService.GetAllPropertyGroup().subscribe((response) => {
      this.dataSource.data = response;
    })
  }

  onSubmit( form: NgForm){
    if( form.valid) {
      this.propertyGroupService.createPropertyGroup(this.newPropertyGroup).subscribe(
        (response) => {
          console.log('New Property Group created', response);
          this.getAllPropertyGroup();
        },
        (error) => {
          console.error('Error creating Property Group' , error);
        }
      )
    }
  }

  deletePropertyGroup(id: string) {
    if(id) {
      this.propertyGroupService.deletePropertyGroup(id).subscribe(
        (response) => {
          console.log('Property Group deleted Successfully');
          this.getAllPropertyGroup();
        },
        (error) => {
          console.error('Error deleting Property Group', error);
        }
      );
    } else {
      console.error('Cannot delete Property Group becaue id is undefined');
    }
  }
  openEditPropertyGroup(propertyGroup: PropertyGroupDTO){
    this.editPropertyGroup = { ...propertyGroup};
    const dialogRef = this.dialog.open(EditPropertyGroupComponent, {
      width: '400px',
      data: {editPropertyGroup : this.editPropertyGroup}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Property Group Edited' , result);
        const index = this.propertyGroupData.findIndex(s => s.propertyId === result.propertyId);
        this.propertyGroupData[index] = result;
        this.ngOnInit();
      }
    })
  }
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

}
