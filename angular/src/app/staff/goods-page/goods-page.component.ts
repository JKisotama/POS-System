import { Component, OnInit } from '@angular/core';
import { GoodsDTO } from '../../API/Admin/goods/model';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsService } from '../../API/Admin/goods/goods.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoodsGroupDTO } from '../../API/Admin/Goods Group/model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CreateGoodsComponent } from './create-goods/create-goods.component';
import { GoodsGroupService } from '../../API/Admin/Goods Group/goodsGroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewGoodUnitComponent } from './view-good-unit/view-good-unit.component';
import { ViewGoodSellPriceComponent } from './view-good-sell-price/view-good-sell-price.component';
import { ViewGoodPropertyComponent } from './view-good-property/view-good-property.component';
import { EditGoodsComponent } from './edit-goods/edit-goods.component';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';


@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrl: './goods-page.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GoodsPageComponent implements OnInit {


  dataSource = new MatTableDataSource<GoodsGroupDTO>();

  form: FormGroup;

  displayedColumns: string[] = ['action', 'goodsName', 'goodsBrand',  'picture', 'goodsStatus'];
  storeId: string | null = null;
  userLevel: number | null = null;
  groupList: { groupId: string; groupName: string }[] = [];


  constructor(
    private goodsService: GoodsService,
    private goodGroupService: GoodsGroupService,
    private authenticationService : AuthenticationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.userLevel = this.authenticationService.getUserRole();
    this.buildForm();
    this.getGoodByGroup();
    this.getAllGoodGroup();

    this.form.get('filterText')?.valueChanges.subscribe(() => {
      this.getGoodByGroup();
    });
    this.form.get('groupId')?.valueChanges.subscribe(() => {
      this.getGoodByGroup();
    })

  }

  buildForm(){
    this.form = this.fb.group({
      groupId: ['', [Validators.required]],
      storeId: [this.storeId, [Validators.required]],
      filterText: [''],
    });
  }

  getGoodByGroup() {
    const groupId = this.form.get('groupId')?.value;
    const filterText = this.form.get('filterText')?.value;
  
    if (this.storeId) {
      this.goodsService.GetProduct(this.storeId, groupId, filterText).subscribe((response) => {
        this.dataSource.data = response;
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
    const dialogRef = this.dialog.open(CreateGoodsComponent, {
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
        this.getGoodByGroup();
      }
    })
  }

  openEditGoods(goods: GoodsDTO): void {
    const dialogRef = this.dialog.open(EditGoodsComponent, {
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
        this.getGoodByGroup(); 
      }
    });
  }

  openViewSellPrice(goodsId: string): void {
    const dialogRef = this.dialog.open(ViewGoodSellPriceComponent, {
      width: '80vw',
      height: '90vh',
      panelClass: 'custom-dialog-container',
      data: { goodsId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getGoodByGroup(); 
      }
    });
  }

  openViewGoodProperty(goodsId: string): void {
    const dialogRef = this.dialog.open(ViewGoodPropertyComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: {goodsId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getGoodByGroup(); 
      }
    });
  }

  

  openViewGoodUnit(goodsId: string): void {
    const dialogRef = this.dialog.open(ViewGoodUnitComponent, {
      width: '80vw',
      height: '90vh',
      panelClass: 'custom-dialog-container',
      data: {goodsId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getGoodByGroup(); 
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
    this.goodsService.deleteProduct(this.storeId, goods.goodsId).subscribe({
      next: () => {
        this.snackBar.open('Product deleted successfully', '', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
        this.getGoodByGroup(); 
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
  

 

}
