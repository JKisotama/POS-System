import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsDTO } from '../../../API/Admin/goods/model';
import { POSService } from '../../../API/Admin/POS/pos.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss'
})
export class DialogProductComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private posService: POSService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}


  form: FormGroup;
  dataSource = new MatTableDataSource<GoodsDTO>();
  displayedColumns: string[] = ['name', 'unit', 'quantity', 'price', 'total'];
  storeId: string | null = null;

  

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
    this.getGoodsList();
  }

  buildForm() {
    this.form = this.fb.group({
      barcode: ['', [Validators.required]],
    });
  }

  getGoodsList(): void {
    if (this.storeId) {
      this.posService.getGoodsList(this.storeId).subscribe(
        (response) => {
          // Initialize the selectedPrice for each good
          this.dataSource.data = response.items.map((item: GoodsDTO) => ({
            ...item,
            selectedPrice: item.tblSellprices[0]?.sellPrice || 0,
          }));
        },
        (error) => {
          console.error('Error fetching goods list:', error);
        }
      );
    }
  }

  updateTotal(good: GoodsDTO): void {
    good.total = (good.quantity ?? 1) * (good.selectedPrice ?? 0);
  }

  onUnitChange(good: GoodsDTO, event: Event): void {
    const selectedUnit = (event.target as HTMLSelectElement).value;
    const matchingPrice = good.tblSellprices.find(
      (price) => price.goodsUnit === selectedUnit
    );
    good.selectedPrice = matchingPrice ? matchingPrice.sellPrice : 0;
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
