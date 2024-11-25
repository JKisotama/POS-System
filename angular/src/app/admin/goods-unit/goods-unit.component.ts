import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsUnitDTO } from '../../API/Admin/Goods Unit/model';
import { GoodsUnitService } from '../../API/Admin/Goods Unit/goodsUnit.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { CreateGoodsUnitComponent } from './create-goods-unit/create-goods-unit.component';

@Component({
  selector: 'app-goods-unit',
  templateUrl: './goods-unit.component.html',
  styleUrl: './goods-unit.component.scss'
})
export class GoodsUnitComponent implements OnInit {

  form: FormGroup;
  storeId: string | null = null;

  dataSource = new MatTableDataSource<GoodsUnitDTO>();

  displayedColumns: string[] = ['action', 'goodsId', 'barcode', 'goodsUnit', 'unitSize', 'unitStatus', 'unitStock', 'storeId'];

  constructor(
    private goodsUnitService: GoodsUnitService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService
  ){}



  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      storeId: [this.storeId, [Validators.required]],
      goodsId: ['', [Validators.required]],
    });
  }

  getGoodsUnit(){
    const goodsId = this.form.get('goodsId')?.value;
    if(this.storeId){
      this.goodsUnitService.GetAllGoodsUnit(this.storeId, goodsId).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  openCreateGoodsUnit(){
    const dialogRef = this.dialog.open(CreateGoodsUnitComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('Create New Good Unit', result);
        this.getGoodsUnit();
      }
    })
  }



}
