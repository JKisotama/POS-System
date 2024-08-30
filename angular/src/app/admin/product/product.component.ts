import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDTO } from '../../API/Admin/Product/model';
import { ProductService } from '../../API/Admin/Product/product.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GoodsUnitComponent } from './goods-unit/goods-unit.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { GoodsGroupComponent } from './goods-group/goods-group.component';
import { GoodsGroupDTO } from '../../API/Admin/Goods Group/model';
import { PropertyGroupComponent } from './property-group/property-group.component';
import { PropertyGroupDTO } from '../../API/Admin/Property Group/model';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  selectedProduct: ProductDTO | undefined;

  productData: ProductDTO[] = [];

  newProduct: ProductDTO = {
    groupId: '',
    goodsId: '',
    goodsName: '',
    goodsBrand: '',
    goodsStatus: '',
  };

  newGoodsGroup: GoodsGroupDTO = {
    groupId: '',
    groupName: '',
    groupStatus: '',
  }

  editProduct: ProductDTO = {
    groupId: '',
    goodsId: '',
    goodsName: '',
    goodsBrand: '',
    goodsStatus: '',
  };

  newPropertyGroup: PropertyGroupDTO = {
    propertyId: '',
    propertyName: ''
  }

  displayedColumns: string[] = ['action','groupId', 'goodsId', 'goodsName', 'goodsBrand', 'goodsStatus'];

  dataSource = new MatTableDataSource<ProductDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private productSerivce: ProductService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getAllProduct();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  getAllProduct(){
    this.productSerivce.GetAllProduct().subscribe((response) => {
      this.dataSource.data = response;
    },
  (error) => {
    console.error('Error fetching product ', error);
  });
  }
  openCreateProductDialog() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '400px',
      data: { newProduct: this.newProduct}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the saved staff data
        console.log('New product saved:', result);
        this.getAllProduct();
       
      }
    });
  }
  
  openEditProduct(product: ProductDTO) {
    this.editProduct = { ...product };
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: { editProduct: this.editProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the edited staff data
        console.log('Staff updated:', result);
        // Update the staff data in the staffData array
        const index = this.productData.findIndex(s => s.goodsName === result.goodsName);
        this.productData[index] = result;
        this.ngOnInit();
      }
    });
  }
  deleteProduct(id: string) {
    if (id) {
      this.productSerivce.deleteProduct(id).subscribe(
        (response) => {
          console.log('Product deleted successfully');
          // Refresh the product list
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    } else {
      // Handle the case where id is undefined
      console.error('Cannot delete product because id is undefined.');
    }
  }
  openGoodsUnitDialog(product: ProductDTO) {
    const dialogRef = this.dialog.open(GoodsUnitComponent, {
      width: '80vw',
    height: '80vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the saved goods unit data
        console.log('Goods unit saved:', result);
        // Refresh the product list
        this.getAllProduct();
      }
    });
  }
  openDetailsDialog(product: ProductDTO) {
    this.selectedProduct = product;
    this.dialog.open(DetailsProductComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { product: this.selectedProduct }
    });
  }

  openAddGoodsGroupDialog() {
    this.dialog.open(GoodsGroupComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { newGoodsGroup : this.newGoodsGroup}
    })
  }

  openAddPropertyGoodsDialog(){
    this.dialog.open(PropertyGroupComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { newPropertyGroup: this.newPropertyGroup }
    })
  }
  onSelectProduct(product: ProductDTO) {
    this.selectedProduct = product;
  }

  onCancel() {
    this.dialog.closeAll();
  }




}
