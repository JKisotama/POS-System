import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { GoodsGroupDTO } from '../../../API/Admin/Goods Group/model';
import { GoodsGroupService } from '../../../API/Admin/Goods Group/goodsGroup.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditGoodsGroupComponent } from './edit-goods-group/edit-goods-group.component';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-goods-group',
  templateUrl: './goods-group.component.html',
  styleUrl: './goods-group.component.scss'
})
export class GoodsGroupComponent implements OnInit {

  goodsGroup: GoodsGroupDTO[];

  goodsGroupData: GoodsGroupDTO[] = [];

  newGoodsGroup: GoodsGroupDTO = {
    groupId: '',
    groupName: '',
    groupStatus: '',
  }

  editGoodsGroup: GoodsGroupDTO = {
    groupId: '',
    groupName: '',
    groupStatus: '',
  }

  showForm = false;

  displayColumns: string[] = ['groupId', 'groupName', 'groupStatus', 'action'];

  dataSource = new MatTableDataSource<GoodsGroupDTO>();

  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;


  constructor(
    public dialogRef: MatDialogRef<GoodsGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {goodsGroup: GoodsGroupDTO[]},
    private goodsGroupService: GoodsGroupService,
    private dialog: MatDialog
  ){
    this.goodsGroup = data.goodsGroup;
    this.dataSource.data = this.goodsGroup;
  }

  ngOnInit(): void {
    this.getAllGoodsGroup();
  }

  getAllGoodsGroup(){
    this.goodsGroupService.GetAllGoodsGroup().subscribe((response) => {
      this.dataSource.data = response;
    })
  }

  onSubmit(form: NgForm){
    if (form.valid) {
      this.goodsGroupService.createGoodsGroup(this.newGoodsGroup).subscribe(
        (response) => {
          console.log('New Goods Group created:', response);
          this.getAllGoodsGroup();
        },
        (error) => {
          console.error('Error creating Goods Group:', error);

        }
      )
    }
  }

  openEditGoodsGroup(goodsGroup: GoodsGroupDTO){
    this.editGoodsGroup = { ...goodsGroup};
    const dialogRef = this.dialog.open(EditGoodsGroupComponent, {
      width: '400px',
      data: { editGoodsGroup : this.editGoodsGroup}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Goods Group Edited', result);

        const index = this.goodsGroupData.findIndex(s => s.groupId === result.groupId);
        this.goodsGroupData[index] = result;
        this.ngOnInit();
      }
    })
  }

  deleteGoodsGroup(id: string){
    if(id){
      this.goodsGroupService.deleteGoodsGroup(id).subscribe(
        (response) => {
          console.log('Goods Unit Deleted Successfully');
          this.getAllGoodsGroup();
        },
        (error) => {
          console.error('Error deleting goods Group:', error);

        }
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete Goods Group because id is undefined.');
    }
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  openDialog() {
    this.dialogRef = this.dialog.open(GoodsGroupComponent, {
      // Dialog options
    });
    if (this.appHeader) {
      this.appHeader.dialogRefGoodsGroup = this.dialogRef;
    }
  }




}
