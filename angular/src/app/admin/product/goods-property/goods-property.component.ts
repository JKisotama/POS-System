import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { GoodsPropertyDTO } from '../../../API/Admin/Goods Property/model';
import { GoodsPropertyService } from '../../../API/Admin/Goods Property/goodsProperty.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { EditGoodsPropertyComponent } from './edit-goods-property/edit-goods-property.component';
import { HeaderComponent } from '../../header/header.component';



@Component({
  selector: 'app-goods-property',
  templateUrl: './goods-property.component.html',
  styleUrl: './goods-property.component.scss'
})
export class GoodsPropertyComponent implements OnInit{

  product: ProductDTO;
  goodsProperty: GoodsPropertyDTO[];
  goodsPropertyData: GoodsPropertyDTO[]= [];

  newGoodsProperty: GoodsPropertyDTO = {
    goodsId: '',
    propertyId: '',
    propertyName: '',
    propertyValue: '',
  }

  editGoodsProperty: GoodsPropertyDTO = {
    goodsId: '',
    propertyId: '',
    propertyName: '',
    propertyValue: '',
  }

  showForm = false;

  displayColumns: string[]= ['goodsId', 'propertyId', 'propertyName', 'propertyValue', 'action'];

  dataSource = new MatTableDataSource<GoodsPropertyDTO>();
  
  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;

  constructor(
    public dialogRef: MatDialogRef<GoodsPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductDTO, goodsProperty: GoodsPropertyDTO[]},
    private goodsPropertyService: GoodsPropertyService,
    private dialog: MatDialog
  ){
    this.product = data.product;
    this.goodsProperty = data.goodsProperty;
    this.dataSource.data = this.goodsProperty;
  }

  ngOnInit(): void {
    this.fetchGoodsProperty();
  }

  fetchGoodsProperty(){
    this.goodsPropertyService.GetAllGoodsProperty().subscribe((goodsProperty) => {
      this.goodsProperty = goodsProperty.filter((goodsProperty: GoodsPropertyDTO) => goodsProperty.goodsId === this.product.goodsId);
      this.dataSource.data = this.goodsProperty;
    })
  }

  onSubmit( form: NgForm) {
    if ( form.valid) {
      this.newGoodsProperty.goodsId = this.product.goodsId;
      this.goodsPropertyService.createGoodsProperty(this.newGoodsProperty).subscribe(
        (response) => {
          console.log('New Goods Property created:', response);
          this.fetchGoodsProperty();
        },
        (error) => {
          console.error('Error creating Goods Property:', error);
        }
      )
    }
  }
  deleteGoodsProperty(id: string) {
    if(id) {
      this.goodsPropertyService.deleteGoodsProperty(id).subscribe(
        (response) => {
          console.log('Goods Property Deleted Successfully');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting Goods Property:', error);

        } 
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete Goods Property because id is undefined.');
    }
  }

  openEditGoodsProperty(goodsProperty: GoodsPropertyDTO){
    this.editGoodsProperty = { ...goodsProperty};
    const dialogRef = this.dialog.open(EditGoodsPropertyComponent, {
      width: '400px',
      data: { editGoodsProperty: this.editGoodsProperty}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Goods Property Edited', result);

        const index = this.goodsPropertyData.findIndex(s => s.goodsId === result.goodsId);
        this.goodsPropertyData[index] = result;
        this.ngOnInit();
      }
    })
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

}
