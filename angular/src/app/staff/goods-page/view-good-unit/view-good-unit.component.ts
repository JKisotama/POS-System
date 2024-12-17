import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsUnitDTO } from '../../../API/Staff/Goods Unit/model';
import { GoodsUnitService } from '../../../API/Staff/Goods Unit/goodsUnit.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateGoodUnitComponent } from './create-good-unit/create-good-unit.component';
import { GoodsService } from '../../../API/Staff/goods/goods.service';
import { EditGoodUnitComponent } from './edit-good-unit/edit-good-unit.component';
import { ConfirmDialogComponent } from '../../../confirm-dialog.component';

@Component({
  selector: 'app-view-good-unit',
  templateUrl: './view-good-unit.component.html',
  styleUrl: './view-good-unit.component.scss'
})
export class ViewGoodUnitComponent implements OnInit {
 
  form: FormGroup;
  storeId: string | null = null;
  goodList: { goodsId: string; goodsName: string} [] = []
  
  dataSource = new MatTableDataSource<GoodsUnitDTO>();
  
  displayedColumns: string[] = ['action', 'goodsId', 'barcode', 'goodsUnit', 'unitSize', 'unitStatus', 'unitStock'];
  
  constructor(
    private goodsUnitService: GoodsUnitService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: { goodsId: string },
    private snackBar: MatSnackBar,
    private goodsService: GoodsService,
  ){}
  
  

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    this.getGoodsUnit();
    this.getGoodByGroup();
  }

  buildForm(){
    this.form = this.fb.group({
      storeId: [this.storeId, [Validators.required]],
      goodsId: ['', [Validators.required]],
    });
  }

  getGoodsUnit(){
    if(this.storeId){
      this.goodsUnitService.GetAllGoodsUnit(this.storeId, this.data.goodsId).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }
  
  getGoodByGroup() {
    const groupId = this.form.get('groupId')?.value;
    const filterText = this.form.get('filterText')?.value;
  
    if (this.storeId) {
      this.goodsService.GetProduct(this.storeId, groupId, filterText).subscribe((response) => {
        this.goodList = response;
      });
    }
  }

  getGoodNameById(goodsId: string): string {
    const good = this.goodList.find((g) => g.goodsId === goodsId);
    return good? good.goodsName : 'Unknown Good Name';
  }

  openCreateGoodUnit(goodsId: string): void {
    const dialogRef = this.dialog.open(CreateGoodUnitComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: {goodsId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Good Unit created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        console.log('Created Good Unit for Goods ID:', goodsId);
        this.getGoodsUnit();
      }
    }); 
  }

  openEditGoodUnit(goodsUnit: GoodsUnitDTO): void {
    const dialogRef = this.dialog.open(EditGoodUnitComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: { goodsUnit }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Good Unit updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.getGoodsUnit();
      }
    });
  }

  confirmDelete(goodUnit: GoodsUnitDTO): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteGoodUnit(goodUnit);
      } else {
        this.snackBar.open('Delete operation canceled', '', {
          duration: 2000,
          panelClass: ['snackbar-error'],
        });
      }
    })
  }

  deleteGoodUnit(goodUnit: GoodsUnitDTO): void {
    if(this.storeId && goodUnit.goodsUnit){
      this.goodsUnitService.deleteGoodsUnit(this.storeId, goodUnit.goodsUnit).subscribe({
        next: () => {
          this.snackBar.open('Good unit deleted successfully', '', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.getGoodsUnit(); 
        },
        error: () => {
          this.snackBar.open('Error while deleting Good unit', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        },
      })
    }
  }


}
