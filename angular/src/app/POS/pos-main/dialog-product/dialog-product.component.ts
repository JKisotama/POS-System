import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsDTO } from '../../../API/Admin/goods/model';
import { POSService } from '../../../API/Admin/POS/pos.service';
import { AuthenticationService } from '../../../API/Admin/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { POSDetailDto, POSDto } from '../../../API/Admin/POS/model';
import { PropertyGroupService } from '../../../API/Admin/Property Group/propertyGroup.service';
import { GoodsPropertyService } from '../../../API/Admin/Goods Property/goodsProperty.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss'
})
export class DialogProductComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private posService: POSService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private propertyService: PropertyGroupService,
    private goodPropertyService: GoodsPropertyService,
    private snackBar: MatSnackBar
  ) {}

  @Output() itemAdded = new EventEmitter<void>();
  form: FormGroup;
  dataSource = new MatTableDataSource<GoodsDTO>();
  displayedColumns: string[] = ['name', 'unit', 'propertyGroup', 'goodProperty', 'quantity', 'price', 'total' , 'addcart'];
  storeId: string | null = null;
  loginName: string | null = null;
  posHeader?: POSDto; // Stores the response from API
  propertyGroups: any[] = [];
  goodProperties: { [goodsId: string]: any[] } = {};

  

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.buildForm();
    
    this.fetchOrderDetails();
    this.getAllPropertyGroup();
  }

  buildForm() {
    this.form = this.fb.group({
      barcode: ['', [Validators.required]],
      goodsName: ['', [Validators.required]],
    });
  }

  getGoodsList(): void {
    const goodsName = this.form.get('goodsName')?.value;
    if (this.storeId) {
      this.posService.getGoodsList(this.storeId, goodsName).subscribe(
        (response) => {
          // Initialize the selectedPrice for each good
          this.dataSource.data = response.items.map((item: GoodsDTO) => ({
            ...item,
            selectedPrice: item.tblSellprices[0]?.sellPrice || 0,
            selectedUnit: '',
            selectedProperty: '',
            selectedGoodProperty: '',
            quantity: 1
          }));
        },
        (error) => {
          console.error('Error fetching goods list:', error);
        }
      );
    }
  }

  getAllPropertyGroup(): void {
    if (this.storeId) {
      this.propertyService.GetAllPropertyGroup(this.storeId).subscribe(
        (response) => {
          this.propertyGroups = response;
        },
        (error) => {
          console.error('Error fetching property groups:', error);
        }
      );
    }
  }

  fetchGoodProperty(goodsId: string, propertyId: string): void {
    if (this.storeId) {
      this.goodPropertyService.GetGoodProperty(this.storeId, goodsId, propertyId).subscribe(
        (response) => {
          this.goodProperties[goodsId] = response; // Cache properties for the specific goodsId
          // Optionally set a default selected property
          const defaultProperty = response[0]?.propertyId || '';
          const good = this.dataSource.data.find((g) => g.goodsId === goodsId);
          if (good && !good.selectedProperty) {
            good.selectedProperty = defaultProperty;
          }
        },
        (error) => {
          console.error('Error fetching good property:', error);
        }
      );
    }
  }

  onPropertyGroupChange(good: GoodsDTO, propertyId: string): void {
    good.selectedProperty = propertyId; // Update the selected property
    if (good.goodsId) {
      this.fetchGoodProperty(good.goodsId, propertyId); // Fetch properties based on selection
    }
  }

  fetchOrderDetails(): void {
    if (this.storeId && this.loginName) {
      this.posService.generatePoHeader(this.storeId, this.loginName).subscribe(
        (data: POSDto) => {
          this.posHeader = data; // Assign the fetched order details
          console.log('Fetched Order Details:', data);
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    }
  }
  onAddItem(good: GoodsDTO): void {
    const barcode = good.barcode || '';    
    // Validation checks
    // Initialize an array to hold error messages
    const errorMessages: string[] = [];

    // Validation checks
    if (!good.selectedUnit) {
        errorMessages.push('Please select a Unit.');
    }

    if (!good.selectedProperty) {
        errorMessages.push('Please select a Property Group.');
    }

    if (!good.selectedGoodProperty) {
        errorMessages.push('Please select a Good Property.');
    }

    if (!good.quantity || good.quantity < 1) {
        errorMessages.push('Please input a valid Quantity.');
    }

    // If there are any error messages, show them
    if (errorMessages.length > 0) {
        this.snackBar.open(errorMessages.join(' '), 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
        });
        return;
    }
   if(this.storeId && this.loginName){
    const requestPayload: POSDetailDto = {
      storeId: this.storeId,
      posCreator: this.loginName || undefined, // Change here
      posNumber: this.posHeader?.posNumber,
      goodsId: good.goodsId,
      barCode: barcode,
      property: good.selectedProperty,
      goodProperty: good.selectedGoodProperty,
      goodsUnit: good.selectedUnit,
      quantity: good.quantity || 0,
    };

    console.log('Sending payload for AddItem:', requestPayload);

    this.posService.addItem(requestPayload).subscribe(
      (response) => {
          console.log('Successfully added item:', response);
          this.snackBar.open('Item added successfully!', 'Close', {
              duration: 3000, // Duration in milliseconds
              panelClass: ['snackbar-success'], // Use the success class
          });
          this.itemAdded.emit();
      },
      (error) => {
          console.error('Error adding item:', error);
          this.snackBar.open('Error adding item. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'], // Use the error class
          });
      }
  );
  }

    
}

  

  updateTotal(good: GoodsDTO): void {
    good.total = (good.quantity ?? 1) * (good.selectedPrice ?? 0);
  }

  onUnitChange(good: GoodsDTO, event: Event): void {
    const selectedUnit = (event.target as HTMLSelectElement).value;
    const matchingPrice = good.tblSellprices.find(
      (price) => price.goodsUnit === selectedUnit
    );
    good.selectedPrice = matchingPrice ? matchingPrice.sellPrice : 0;
  
    // Update the barcode based on the selected unit
    good.barcode = matchingPrice ? matchingPrice.barcode : '';
    console.log(good.barcode);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
