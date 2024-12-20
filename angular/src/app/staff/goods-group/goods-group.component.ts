import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsGroupDTO } from '../../API/Staff/Goods Group/model';
import { GoodsGroupService } from '../../API/Staff/Goods Group/goodsGroup.service';
import { AuthenticationService } from '../../API/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGoodGroupComponent } from './create-good-group/create-good-group.component';
import { SupplierService } from '../../API/Staff/Supplier/supplier.service';
import { EditGoodGroupComponent } from './edit-good-group/edit-good-group.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

@Component({
  selector: 'app-goods-group',
  templateUrl: './goods-group.component.html',
  styleUrl: './goods-group.component.scss'
})
export class GoodsGroupComponent implements OnInit {


  dataSource = new MatTableDataSource<GoodsGroupDTO>();

  displayedColumns: string[] = ['action', 'groupName', 'groupStatus'];

  storeId: string | null = null;



  constructor(
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
      this.goodGroupService.GetAllGoodsGroup(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      },);
    } 
  }

  openCreateGoodGroup(){
    const dialogRef = this.dialog.open(CreateGoodGroupComponent, {
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
    const dialogRef = this.dialog.open(EditGoodGroupComponent, {
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
      data: {
        message: 'Are you sure you want to delete this item?'
      },
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
