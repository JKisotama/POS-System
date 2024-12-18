import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsGroupDTO } from '../../API/Staff/Goods Group/model';
import { AdminGoodsGroupService } from '../../API/Admin/good-group/good-group.service';
import { AuthenticationService } from '../../API/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCreateGoodGroupComponent } from './admin-create-good-group/admin-create-good-group.component';
import { AdminEditGoodGroupComponent } from './admin-edit-good-group/admin-edit-good-group.component';
import { GoodsGroupService } from '../../API/Staff/Goods Group/goodsGroup.service';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-admin-good-group',
  templateUrl: './admin-good-group.component.html',
  styleUrl: './admin-good-group.component.scss'
})
export class AdminGoodGroupComponent implements OnInit{

  dataSource = new MatTableDataSource<GoodsGroupDTO>();
  
    displayedColumns: string[] = ['action', 'groupName', 'groupStatus'];
  
    storeId: string | null = null;
  
  
  
    constructor(
      private adminGoodGroupService: AdminGoodsGroupService,
      private goodGroupService: GoodsGroupService,
      private authenticationService: AuthenticationService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
    ){}
  
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.getAllGoodGroup();
  
    }
  
    getAllGoodGroup(){
      if(this.storeId) {
        this.adminGoodGroupService.GetAllGoodsGroup(this.storeId).subscribe((response) => {
          this.dataSource.data = response;
        },);
      } 
    }
  
    openCreateGoodGroup(){
      const dialogRef = this.dialog.open(AdminCreateGoodGroupComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.snackBar.open('Created new Good Group successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
          this.getAllGoodGroup();
        }
      });
    }
  
    openEditGoodGroup(goodGroup: GoodsGroupDTO){
      const dialogRef = this.dialog.open(AdminEditGoodGroupComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
        data: {goodGroup}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.snackBar.open('Update Good Group successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
  
          this.getAllGoodGroup();
        }
      })
    }
  
    confirmDelete(goodGroup: GoodsGroupDTO): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        panelClass: 'custom-dialog-container',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if(result) {
          this.deleteGoodGroup(goodGroup);
        } else {
          this.snackBar.open('Delete operation canceled', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        }
      })
    }
  
    deleteGoodGroup(goodGroup: GoodsGroupDTO): void {
      if(this.storeId && goodGroup.groupId) {
        this.goodGroupService.deleteGroup(this.storeId, goodGroup.groupId).subscribe({
          next: () => {
            this.snackBar.open('Good Group deleted successfully', '', {
              duration: 2000,
              panelClass: ['snackbar-success'],
            });
            this.getAllGoodGroup();
          },
          error: () => {
            this.snackBar.open('Error while deleting Good Group', '', {
              duration: 2000,
              panelClass: ['snackbar-error'],
            });
          },
        })
      }
    }
}
