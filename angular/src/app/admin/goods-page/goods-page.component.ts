import { Component, OnInit } from '@angular/core';
import { GoodsDTO } from '../../API/admin/goods/model';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsService } from '../../API/admin/goods/goods.service';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrl: './goods-page.component.scss'
})
export class GoodsPageComponent implements OnInit {


  dataSource = new MatTableDataSource<GoodsDTO>();

  displayedColumns: string[] = ['action','groupId', 'goodsId', 'goodsName', 'goodsBrand', 'goodsStatus'];

  constructor(
    private goodsService: GoodsService,
  ){}

  ngOnInit(): void {
    this.getAllGoods();
  }

  getAllGoods(){
    this.goodsService.GetAllProduct().subscribe((response) => {
      this.dataSource.data = response;
    },
  (error) => {
    console.log('Error fetching Goods', error);
  });
  }

}
