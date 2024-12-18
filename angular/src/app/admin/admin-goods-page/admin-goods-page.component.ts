import { Component, OnInit } from '@angular/core';
import { GoodsGroupDTO } from '../../API/Staff/Goods Group/model';
import { MatTableDataSource } from '@angular/material/table';
import { AdminGoodsService } from '../../API/Admin/goods/goods.service';
import { AuthenticationService } from '../../API/authentication.service';
import { GoodsGroupService } from '../../API/Staff/Goods Group/goodsGroup.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoodsDTO } from '../../API/Staff/goods/model';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';
import { AdminCreateGoodComponent } from './admin-create-good/admin-create-good.component';
import { AdminEditGoodComponent } from './admin-edit-good/admin-edit-good.component';
import { AdminViewGoodSellPriceComponent } from './admin-view-good-sell-price/admin-view-good-sell-price.component';
import { AdminViewGoodPropertyComponent } from './admin-view-good-property/admin-view-good-property.component';
import { AdminViewGoodUnitComponent } from './admin-view-good-unit/admin-view-good-unit.component';

@Component({
  selector: 'app-admin-goods-page',
  templateUrl: './admin-goods-page.component.html',
  styleUrl: './admin-goods-page.component.scss'
})
export class AdminGoodsPageComponent implements OnInit {

  dataSource = new MatTableDataSource<GoodsGroupDTO>();
  displayedColumns: string[] = ['action', 'goodsName', 'goodsBrand',  'picture', 'goodsStatus'];

  storeId: string | null = null;
  groupList: { groupId: string; groupName: string }[] = [];


  constructor(
    private adminGoodsService: AdminGoodsService,
    private authenticationService : AuthenticationService,
    private goodGroupService: GoodsGroupService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
     
  ){

  }

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.getAllGood();
  }

  getAllGood() {
    
    if (this.storeId) {
      this.adminGoodsService.GetAllProduct(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      },
      (error) => {
      });
    }
  }

  getAllGoodGroup() {
    if (this.storeId) {
      this.goodGroupService.GetAllGoodsGroup(this.storeId).subscribe((response) => {
        this.groupList = response;
      });
    }
  }
  getGroupNameById(groupId: string): string {
    const group = this.groupList.find((g) => g.groupId === groupId);
    return group ? group.groupName : 'Unknown Group Name';
  }

   openCreateGoods(){
      const dialogRef = this.dialog.open(AdminCreateGoodComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Created new Good' , result);
          this.snackBar.open('Created new Good successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
          });
          this.getAllGood();
        }
      })
    }
  
    openEditGoods(goods: GoodsDTO): void {
      const dialogRef = this.dialog.open(AdminEditGoodComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
        data: {goods}, 
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.snackBar.open('Update Good successfully!', 'Close', {
            duration: 3000, 
            panelClass: ['snackbar-success'], 
        });
          this.getAllGood(); 
        }
      });
    }

    confirmDelete(goods: GoodsDTO): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          panelClass: 'custom-dialog-container',
        });
      
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.deleteGood(goods);
          } else {
            this.snackBar.open('Delete operation canceled', '', {
              duration: 2000,
              panelClass: ['snackbar-error'],
            });
          }
        });
      }
      
      deleteGood(goods: GoodsDTO): void {
       if(this.storeId && goods.goodsId){
        this.adminGoodsService.deleteProduct(this.storeId, goods.goodsId).subscribe({
          next: () => {
            this.snackBar.open('Product deleted successfully', '', {
              duration: 2000,
              panelClass: ['snackbar-success'],
            });
            this.getAllGood(); 
          },
          error: () => {
            this.snackBar.open('Error while deleting product', '', {
              duration: 2000,
              panelClass: ['snackbar-error'],
            });
          },
        });
       }
      }

      openViewSellPrice(goodsId: string): void {
          const dialogRef = this.dialog.open(AdminViewGoodSellPriceComponent, {
            width: '80vw',
            height: '90vh',
            panelClass: 'custom-dialog-container',
            data: { goodsId }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.getAllGood(); 
            }
          });
        }
      
        openViewGoodProperty(goodsId: string): void {
          const dialogRef = this.dialog.open(AdminViewGoodPropertyComponent, {
            width: '80vw',
            height: '90vh',
            panelClass: 'custom-dialog-container',
            data: {goodsId}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.getAllGood(); 
            }
          });
        }
      
        
      
        openViewGoodUnit(goodsId: string): void {
          const dialogRef = this.dialog.open(AdminViewGoodUnitComponent, {
            width: '80vw',
            height: '90vh',
            panelClass: 'custom-dialog-container',
            data: {goodsId}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.getAllGood(); 
            }
          });
        }


}
