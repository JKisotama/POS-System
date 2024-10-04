import { Component, OnInit } from '@angular/core';
import { GoodsDTO } from '../../API/Admin/goods/model';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsService } from '../../API/Admin/goods/goods.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrl: './goods-page.component.scss'
})
export class GoodsPageComponent implements OnInit {


  dataSource = new MatTableDataSource<GoodsDTO>();

  displayedColumns: string[] = ['action','groupId', 'goodsId', 'goodsName', 'goodsBrand', 'goodsStatus'];
  storeId: string | null = null;

  constructor(
    private goodsService: GoodsService,
    private authenticationService : AuthenticationService
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser()
    console.log(this.storeId)

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
