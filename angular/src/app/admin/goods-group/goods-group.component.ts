import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsGroupDTO } from '../../API/Admin/Goods Group/model';
import { GoodsGroupService } from '../../API/Admin/Goods Group/goodsGroup.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGoodGroupComponent } from './create-good-group/create-good-group.component';
import { SupplierService } from '../../API/Admin/Supplier/supplier.service';

@Component({
  selector: 'app-goods-group',
  templateUrl: './goods-group.component.html',
  styleUrl: './goods-group.component.scss'
})
export class GoodsGroupComponent implements OnInit {


  dataSource = new MatTableDataSource<GoodsGroupDTO>();

  displayedColumns: string[] = ['action', 'groupId', 'groupName', 'groupStatus','storeId'];

  storeId: string | null = null;

  constructor(
    private goodGroupService: GoodsGroupService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ){}


  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.getAllGoodGroup();

  }

  getAllGoodGroup(){
    if(this.storeId) {
      this.goodGroupService.GetAllGoodsGroup(this.storeId).subscribe((response) => {
        this.dataSource.data = response;
      },);
    } 
  }

  openCreateGoodGroup(){
    const dialogRef = this.dialog.open(CreateGoodGroupComponent, {
      width: '700px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Created new Good Group', result);
        this.getAllGoodGroup();
      }
    });
  }



}
