import { Component , Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { InventoryDTO } from '../../../API/Admin/Inventory/model';
import { InventoryService } from '../../../API/Admin/Inventory/inventory.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { ProductService } from '../../../API/Admin/Product/product.service';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {


  inventoryData: InventoryDTO[] =[];
  goods: ProductDTO[] = [];

  showForm = false;

  newInventory: InventoryDTO = {
    amount: '',
    unit: '',
    goodsName: '',
    type: '',
    buyPrice: '',
    totalAmount: ''
  }

  editInventory: InventoryDTO = {
    amount: '',
    unit: '',
    goodsName: '',
    type: '',
    buyPrice: '',
    totalAmount: ''
  }

  displayColumns: string[] = ['amount', 'unit', 'goodsName', 'type', 'buyPrice', 'totalAmount', 'action'];

  dataSource = new MatTableDataSource<InventoryDTO>();

  @ViewChild(HeaderComponent) appHeader?: HeaderComponent;


  constructor(
    public dialogRef: MatDialogRef<InventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private goodsService: ProductService

  ){}

  ngOnInit(): void {
    this.getAllInventory();
    this.getAllGoods();
  }

  getAllGoods(){
    this.goodsService.GetAllProduct().subscribe((result) => {
      this.goods = result;
    })
  }

  getAllInventory(){
    this.inventoryService.GetAllInventory().subscribe((result) => {
      this.dataSource.data = result;
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.inventoryService.createInventory(this.newInventory).subscribe(
        (response) => {
          console.log('New Inventory created:' , response);
          this.ngOnInit();
        },
        (error) => {
          console.error('Error creating Inventory:', error);
        }
      )
    }
  }

  deleteInventory(id: string) {
    if (id) {
      this.inventoryService.deleteInventory(id).subscribe(
        (response) => {
          console.log('Inventory Deleted Successfully');
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting Inventory:', error);

        }
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete Inventory because id is undefined.');
    }
  }

  openEditInventoryDialog(inventory: InventoryDTO) {
    this.editInventory = { ...inventory};
    const dialogRef = this.dialog.open(EditInventoryComponent, {
      width: '400px',
      data : { editInventory: this.editInventory}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Inventory Edited', result);

        const index = this.inventoryData.findIndex( s => s.goodsName === result.goodsName);
        this.inventoryData[index] = result;
        this.ngOnInit();
      }
    })
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }
  
}