import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ProductDTO } from '../../../API/Admin/Product/model';
import { ProductService } from '../../../API/Admin/Product/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  newProduct: ProductDTO = {
    groupId: '',
    goodsId: '',
    goodsName: '',
    goodsBrand: '',
    goodsStatus: '',
  };

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ){}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.productService.createProduct(this.newProduct).subscribe(
        (response) => {
          console.log('New Product created:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating new product:', error);
        }
      );
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}
