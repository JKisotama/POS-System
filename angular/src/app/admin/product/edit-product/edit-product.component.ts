import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { ProductService } from '../../../API/Admin/Product/product.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  editProduct: ProductDTO;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editProduct: ProductDTO },
    private productService: ProductService
  ){
    this.editProduct = { ...data.editProduct };
  }
  ngOnInit(): void {
    
  }

  onSave() {
    this.productService.updateProduct(this.editProduct).subscribe(
      (response) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating Product:', error);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
