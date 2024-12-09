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
import { CreateSellPriceComponent } from './create-sell-price/create-sell-price.component';


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
  expandedGroup: GoodsGroupDTO | null = null;

    form: FormGroup;

  displayedColumns: string[] = ['action','groupId', 'goodsId', 'goodsName', 'goodsBrand',  'picture', 'goodsStatus', 'storeId'];
  storeId: string | null = null;
  userLevel: number | null = null;
  groupList: { groupId: string; groupName: string }[] = [];


  constructor(
    private goodsService: GoodsService,
    private goodGroupService: GoodsGroupService,
    private authenticationService : AuthenticationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    
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
        this.groupList = response; // Assuming response is an array of groups
      });
    }
  }

  toggleRow(group: GoodsGroupDTO) {
    group.expanded = !group.expanded;
  }

  // Check if a group is expanded
  isExpanded(group: GoodsGroupDTO): boolean {
    return this.expandedGroup === group;
  }

  openCreateGoods(){
    const dialogRef = this.dialog.open(CreateGoodsComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Created new Good' , result);
        this.getGoodByGroup();
      }
    })
  }

  openCreateSellPrice(goodsId: string): void {
    const dialogRef = this.dialog.open(CreateSellPriceComponent, {
      width: '700px',
      data: { goodsId } // Pass the goodsId to the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Created Sell Price for Goods ID:', goodsId);
        this.getGoodByGroup(); // Refresh the table data if necessary
      }
    });
  }

 

}
