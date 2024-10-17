import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyGroupDTO } from '../../API/Admin/Property Group/model';
import { PropertyGroupService } from '../../API/Admin/Property Group/propertyGroup.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePropertyGroupComponent } from './create-property-group/create-property-group.component';

@Component({
  selector: 'app-property-group',
  templateUrl: './property-group.component.html',
  styleUrl: './property-group.component.scss'
})
export class PropertyGroupComponent implements OnInit {

  dataSource = new MatTableDataSource<PropertyGroupDTO>();

  displayedColumns: string[] = ['action', 'propertyId', 'propertyName', 'storeId'];

  storeId: string | null = null;

  constructor(
    private propertyGroupService: PropertyGroupService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.getAllPropertyGroup();
  }

  getAllPropertyGroup(){
    if(this.storeId) {
      this.propertyGroupService.GetAllPropertyGroup(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  openCreatePropertyGroup(){
    const dialogRef = this.dialog.open(CreatePropertyGroupComponent, {
      width: '700px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Created New Property Group', result);
        this.getAllPropertyGroup();
      }
    })
  }


}
