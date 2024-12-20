import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellPriceService } from '../../../API/Staff/Sell Price/sellPrice.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoodsService } from '../../../API/Staff/goods/goods.service';
import { MatTableDataSource } from '@angular/material/table';
import { SellPriceDTO } from '../../../API/Staff/Sell Price/model';
import { CreateSellPriceComponent } from './create-sell-price/create-sell-price.component';
import { EditGoodSellPriceComponent } from './edit-good-sell-price/edit-good-sell-price.component';
import { ConfirmDialogComponent } from '../../../confirm-dialog.component';

@Component({
  selector: 'app-view-good-sell-price',
  templateUrl: './view-good-sell-price.component.html',
  styleUrl: './view-good-sell-price.component.scss'
})
export class ViewGoodSellPriceComponent implements OnInit {


  form: FormGroup;
  storeId: string | null = null;
  dataSource = new MatTableDataSource<SellPriceDTO>([]);
  displayedColumns: string[] = ['action', 'goodsName', 'barcode', 'goodsUnit' ,'sellNumber', 'sellPrice'];

  goodList: { goodsId: string; goodsName: string} [] = [];

  constructor(
    private goodSellPriceService: SellPriceService,
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
    this.getGoodSellPrice();
    this.getGoodByGroup();
    
  }

  buildForm(){
      this.form = this.fb.group({
        storeId: [this.storeId, [Validators.required]],
        goodsId: ['', [Validators.required]],
      });
    }

  getGoodSellPrice() {
    if (this.storeId) {
      this.goodSellPriceService
        .GetAllSellPrice(this.storeId, this.data.goodsId)
        .subscribe((response) => {
          console.log('Fetched Data:', response); // Debug fetched data
          this.dataSource.data = response || []; // Ensure it's an array
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


  openCreateGoodSellPrice(goodsId: string): void {
    const dialogRef = this.dialog.open(CreateSellPriceComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: {goodsId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Good Sell Price created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.getGoodSellPrice();
      }
    });
  }

  openEditGoodSellPrice(sellPrice: SellPriceDTO) {
    const dialogRef = this.dialog.open(EditGoodSellPriceComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: { sellPrice }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Good Sell Price Updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.getGoodSellPrice();
      }
    })
  }

  confirmDelete(sellPrice: SellPriceDTO): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        message: 'Are you sure you want to delete this item?'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSellPrice(sellPrice);
      } else {
        this.snackBar.open('Delete operation canceled', '', {
          duration: 2000,
          panelClass: ['snackbar-error'],
        });
      }
    })
  }

  deleteSellPrice(sellPrice: SellPriceDTO): void {
    if(this.storeId && sellPrice.goodsId && sellPrice.goodsUnit){
      this.goodSellPriceService.deleteSellPrice(this.storeId, sellPrice.goodsId, sellPrice.goodsUnit).subscribe({
        next: () => {
          this.snackBar.open('Sell Price deleted successfully', '', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.getGoodSellPrice(); 
        },
        error: () => {
          this.snackBar.open('Error while deleting Sell Price', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        },
      })
    }
  }



}
