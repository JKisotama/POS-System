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
  innerDataSource = new MatTableDataSource<GoodsDTO>();

    form: FormGroup;

  displayedColumns: string[] = ['expandArrow','action','groupId', 'groupName', 'groupStatus','storeId'];
  childDisplayedColumns: string[] = ['goodsId', 'goodsName', 'goodsBrand',  'picture', 'goodsStatus'];
  storeId: string | null = null;
  userLevel: number | null = null;

  constructor(
    private goodsService: GoodsService,
    private authenticationService : AuthenticationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    
  ){}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.userLevel = this.authenticationService.getUserRole();
    console.log(this.storeId);
    console.log(this.userLevel);
    this.buildForm();

    // this.form.get('filterText')?.valueChanges.subscribe(filterText => {
    //   this.getGoodByGroup();
    // });

  }

  buildForm(){
    this.form = this.fb.group({
      groupId: ['', [Validators.required]],
      storeId: [this.storeId, [Validators.required]],
      filterText: [''],
    });
  }

  getGoodByGroup(){
    const groupId = this.form.get('groupId')?.value;
    const filterText = this.form.get('filterText')?.value;
    if(this.storeId){
      this.goodsService.GetProduct(this.storeId, groupId).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  toggleRow(group: GoodsGroupDTO) {
    group.expanded = !group.expanded;
    this.innerDataSource.data = group.tblGoods;
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

 

}
