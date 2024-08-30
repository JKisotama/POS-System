import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { GoodsUnitDTO } from '../../../API/Admin/Goods Unit/model';
import { GoodsUnitService } from '../../../API/Admin/Goods Unit/goodsUnit.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { EditGoodsUnitComponent } from './edit-goods-unit/edit-goods-unit.component';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-goods-unit',
  templateUrl: './goods-unit.component.html',
  styleUrl: './goods-unit.component.scss'
})
export class GoodsUnitComponent implements OnInit {

  product: ProductDTO;
  goodsUnits: GoodsUnitDTO[];

  goodsUnitData: GoodsUnitDTO[] = [];


  newGoodsUnit: GoodsUnitDTO = {
    goodsId: '',
    barCode: '',
    goodsUnit: '',
    unitSize: '',
    unitStatus: '',
    unitStock: '',
  }

  editGoodsUnit: GoodsUnitDTO = {
    goodsId: '',
    barCode: '',
    goodsUnit: '',
    unitSize: '',
    unitStatus: '',
    unitStock: '',
  }

  showForm = false;






  displayColumns: string[] = ['goodsId', 'barCode', 'goodsUnit', 'unitSize', 'unitStatus', 'unitStock', 'action'];

  dataSource = new MatTableDataSource<GoodsUnitDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;


  constructor(
    public dialogRef: MatDialogRef<GoodsUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductDTO; goodsUnits: GoodsUnitDTO[] },
    private goodsUnitService: GoodsUnitService,
    private dialog: MatDialog
  ){
    this.product = data.product;
    this.goodsUnits = data.goodsUnits;
    this.dataSource.data = this.goodsUnits;
  }

  ngOnInit(): void {
    this.fetchGoodsUnits();
  }

  fetchGoodsUnits() {
    this.goodsUnitService.GetAllGoodsUnit().subscribe((goodsUnits) => {
      this.goodsUnits = goodsUnits.filter((unit: GoodsUnitDTO) => unit.goodsId === this.product.goodsId);
      this.dataSource.data = this.goodsUnits;
      this.dataSource.paginator = this.paginator;
    });
  }

  

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.newGoodsUnit.goodsId = this.product.goodsId;
      this.goodsUnitService.createGoodsUnit(this.newGoodsUnit).subscribe(
        (response) => {
          console.log('New Goods Unit created:', response);
          this.fetchGoodsUnits();
        },
        (error) => {
          console.error('Error creating Goods Unit:', error);
        }
      );
    }
  }

  openEditGoodsUnit(goods: GoodsUnitDTO){
    this.editGoodsUnit = {...goods};
    const dialogRef = this.dialog.open(EditGoodsUnitComponent, {
      width: '400px',
      data: { editGoodsUnit: this.editGoodsUnit}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Goods Unit Edited', result);

        const index = this.goodsUnitData.findIndex(s => s.goodsId === result.goodsId);
        this.goodsUnitData[index] = result;
        this.ngOnInit();
      }
    })
  }

  deleteGoodsUnit(id: string) {
    if(id) {
      this.goodsUnitService.deleteGoodsUnit(id).subscribe(
        (response) => {
          console.log('Goods Unit Deleted Successfully');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting goods Unit:', error);

        }
      ); 
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete product because id is undefined.');
    }
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }
}
