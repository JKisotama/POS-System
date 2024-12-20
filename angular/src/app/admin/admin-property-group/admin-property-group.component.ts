import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyGroupDTO } from '../../API/Staff/Property Group/model';
import { PropertyGroupService } from '../../API/Staff/Property Group/propertyGroup.service';
import { AdminPropertyGroupService } from '../../API/Admin/property-group/property-group.service';
import { AuthenticationService } from '../../API/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCreatePropertyGroupComponent } from './admin-create-property-group/admin-create-property-group.component';
import { AdminEditPropertyGroupComponent } from './admin-edit-property-group/admin-edit-property-group.component';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-admin-property-group',
  templateUrl: './admin-property-group.component.html',
  styleUrl: './admin-property-group.component.scss'
})
export class AdminPropertyGroupComponent implements OnInit{

  dataSource = new MatTableDataSource<PropertyGroupDTO>();
  
    displayedColumns: string[] = ['action', 'propertyName'];
  
    storeId: string | null = null;
  
    constructor(
      private adminPropertyGroupService: AdminPropertyGroupService,
      private propertyGroupService: PropertyGroupService,
      private authenticationService: AuthenticationService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
    ){}
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.getAllPropertyGroup();
    }
  
    getAllPropertyGroup(){
      if(this.storeId) {
        this.adminPropertyGroupService.GetAllPropertyGroup(this.storeId).subscribe((response) => {
          this.dataSource.data = response;
        });
      }
    }
  
    openCreatePropertyGroup(){
      const dialogRef = this.dialog.open(AdminCreatePropertyGroupComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.snackBar.open('Created new Property Group successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
          this.getAllPropertyGroup();
        }
      })
    }
  
    openEditPropertyGroup(propertyGroup: PropertyGroupDTO){
      const dialogRef = this.dialog.open(AdminEditPropertyGroupComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
        data: { propertyGroup }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.snackBar.open('Update Good successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
          console.log('Updated Successfully Property Group', result);
          this.getAllPropertyGroup();
        }
      })
    }
  
    confirmDelete(propertyGroup: PropertyGroupDTO): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          message: 'Are you sure you want to delete this item?'
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if(result) {
          this.deletePropertyGroup(propertyGroup);
        } else {
          this.snackBar.open('Delete operation canceled', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        }
      })
    }
  
    deletePropertyGroup(propertyGroup: PropertyGroupDTO): void {
      if(this.storeId && propertyGroup.propertyId){
        this.propertyGroupService.deleteGroupProperty(this.storeId, propertyGroup.propertyId).subscribe({
          next: () => {
            this.snackBar.open('Property Group deleted successfully', '', {
              duration: 2000,
              panelClass: ['snackbar-success'],
            });
            this.getAllPropertyGroup(); 
          },
          error: () => {
            this.snackBar.open('Error while deleting Property Group', '', {
              duration: 2000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    }
}
