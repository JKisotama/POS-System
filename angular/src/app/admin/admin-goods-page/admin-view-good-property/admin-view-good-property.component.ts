import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsPropertyDTO } from '../../../API/Staff/Goods Property/model';
import { GoodsPropertyService } from '../../../API/Staff/Goods Property/goodsProperty.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../API/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoodsService } from '../../../API/Staff/goods/goods.service';
import { PropertyGroupService } from '../../../API/Staff/Property Group/propertyGroup.service';
import { AdminCreateGoodPropertyComponent } from './admin-create-good-property/admin-create-good-property.component';
import { AdminEditGoodPropertyComponent } from './admin-edit-good-property/admin-edit-good-property.component';
import { ConfirmDialogComponent } from '../../../confirm-dialog.component';

@Component({
  selector: 'app-admin-view-good-property',
  templateUrl: './admin-view-good-property.component.html',
  styleUrl: './admin-view-good-property.component.scss'
})
export class AdminViewGoodPropertyComponent implements OnInit{


  form: FormGroup;
    storeId: string | null = null;
    dataSource = new MatTableDataSource<GoodsPropertyDTO>();
    displayedColumns: string[] = ['action', 'goodsName', 'propertyName', 'propertyValue'];
    goodList: { goodsId: string; goodsName: string} [] = [];
    propertyGroupList: { propertyId: string; propertyName: string } [] = []
  
    constructor(
      private goodPropertyService: GoodsPropertyService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private authenticationService: AuthenticationService,
      @Inject(MAT_DIALOG_DATA) public data: { goodsId: string },
      private snackBar: MatSnackBar,
      private goodsService: GoodsService,
      private propertyGroupService: PropertyGroupService,
    ){}
  
    ngOnInit(): void {
      this.storeId = this.authenticationService.getStoreIdUser();
      this.buildForm();
      this.getGoodByGroup();
      this.getAllPropertyGroup();
      this.getGoodProperty();
      
    }
  
    buildForm(){
        this.form = this.fb.group({
          groupId: ['', [Validators.required]],
          storeId: [this.storeId, [Validators.required]],
          filterText: [''],
        });
      }
  
    getGoodProperty(){
      if(this.storeId){
        this.goodPropertyService.GetAllGoodPropertyByGoodId(this.storeId, this.data.goodsId).subscribe((response) => {
          this.dataSource.data = response;
        });
      }
    }
  
    getGoodByGroup() {
      const groupId = this.form.get('groupId')?.value;
      const filterText = this.form.get('filterText')?.value;
    
      if (this.storeId) {
        this.goodsService.GetProduct(this.storeId, groupId, filterText).subscribe((response) => {
          this.goodList = response;
        });
      }
    }
  
    getAllPropertyGroup(){
      if (this.storeId) {
        this.propertyGroupService.GetAllPropertyGroup(this.storeId).subscribe((response) => {
          this.propertyGroupList = response;
        })
      }
    }
  
    getGoodNameById(goodsId: string): string {
      const good = this.goodList.find((g) => g.goodsId === goodsId);
      return good? good.goodsName : 'Unknown Good Name';
    }
  
    getPropertyGroupNameById(propertyId: string): string {
      const propertyGroup = this.propertyGroupList.find((g) => g.propertyId === propertyId);
      return propertyGroup? propertyGroup.propertyName : 'Unknown Property Group Name';
    }
  
    openCreateGoodProperty(goodsId: string): void {
      const dialogRef = this.dialog.open(AdminCreateGoodPropertyComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
        data: {goodsId}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open('Good Property created successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
          console.log('Created Good Sell Price for Goods ID:', goodsId);
          this.getGoodProperty();
        }
      });
    }
  
    openEditGoodProperty(goodProperty: GoodsPropertyDTO){
      const dialogRef = this.dialog.open(AdminEditGoodPropertyComponent, {
        width: '700px',
        panelClass: 'custom-dialog-container',
        data: { goodProperty }
      })
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackBar.open('Good Property updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
          
          this.getGoodProperty();
        }
      });
    }

    confirmDelete(goodProperty: GoodsPropertyDTO): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          panelClass: 'custom-dialog-container',
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.deleteGoodProperty(goodProperty);
          } else {
            console.log('Delete Good Property Cancelled');
          }
        });
      }
    
      deleteGoodProperty(goodProperty: GoodsPropertyDTO){
        if(this.storeId){
          this.goodPropertyService.deleteGoodsProperty(this.storeId, goodProperty.propertyGoodsId).subscribe({
            next: () => {
              this.snackBar.open('Good Property deleted successfully', '', {
                duration: 2000,
                panelClass: ['snackbar-success'],
              });
              this.getGoodProperty(); 
            },
            error: () => {
              this.snackBar.open('Error while deleting Good Property', '', {
                duration: 2000,
                panelClass: ['snackbar-error'],
              });
            },
          })
        }
      }
  
}
