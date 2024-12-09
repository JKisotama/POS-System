import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { POSDetailDto, POSDto } from '../../API/Admin/POS/model';
import { POSService } from '../../API/Admin/POS/pos.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { CustomerDTO } from '../../API/Admin/Customer/model';
import { GoodsDTO } from '../../API/Admin/goods/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { DialogInvoiceComponent } from './dialog-invoice/dialog-invoice.component';
import { PropertyGroupDTO } from '../../API/Admin/Property Group/model';
import { PropertyGroupService } from '../../API/Admin/Property Group/propertyGroup.service';

@Component({
  selector: 'app-pos-main',
  templateUrl: './pos-main.component.html',
  styleUrls: ['./pos-main.component.scss']
})
export class PosMainComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private posService: POSService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private propertyService: PropertyGroupService,
  ) {}

  // Define columns to be displayed in the table
  displayedColumns: string[] = ['goodsName', 'barcode', 'unit', 'propertyName' , 'propertyValue' ,'quantity', 'itemPrice', 'subTotal', 'lineDiscount', 'lineTotal'];

  // Data source for the table
  dataSource = new MatTableDataSource<POSDetailDto>();
  storeId: string | null = null;
  loginName: string | null = null;

  showCards: boolean = false; // Controls the visibility of the cards
  currentCashierId: number = 1; // Tracks the cashier ID
  currentPosCreator: number = 1; // Tracks the POS creator
  posHeader?: POSDto; // Stores the response from API
  orders: POSDto[] = [];

  selectedCustomer?: CustomerDTO;
  form: FormGroup;

  // Property to track the active order
  activeOrderId: string | null = null;


  subtotal: number = 0;
  discount: number = 0;
  tax: number = 0;
  total: number = 0;
  propertyGroups: Map<string, string> = new Map();

  // ViewChild to bind paginator and sort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Lifecycle hook to initialize data
  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const storedCashierId = localStorage.getItem('currentCashierId');
    const storedPosCreator = localStorage.getItem('currentPosCreator');

    // Parse stored values or fallback to 1 if they are not available or invalid
    this.currentCashierId = storedCashierId ? parseInt(storedCashierId, 10) : 1;
    this.currentPosCreator = storedPosCreator ? parseInt(storedPosCreator, 10) : 1;
    this.buildForm();
    this.fetchOrderDetails();
    this.getAllPropertyGroup();
    this.fetchPOList();
  }

  buildForm() {
    this.form = this.fb.group({
      quantity: ['', [Validators.required]],
    });
  }

  getAllPropertyGroup(): void {
    if (this.storeId) {
      this.propertyService.GetAllPropertyGroup(this.storeId).subscribe(
        (response: PropertyGroupDTO[]) => {
          this.propertyGroups = new Map(response.map(prop => [prop.propertyId || '', prop.propertyName || '']));
          console.log('Property Groups:', Array.from(this.propertyGroups.entries())); // Log the propertyGroups
        },
        (error) => {
          console.error('Error fetching property groups:', error);
        }
      );
    }
  }

  fetchPOList(): void {
    if (this.storeId) {
      this.posService.getPOList(this.storeId).subscribe(
        (data: POSDetailDto[]) => {
          // Map groupProperty to propertyName based on propertyValue
          const mappedData = data.map(item => {
            // Get the propertyId based on the propertyValue
            const propertyId = item.property; // Assuming this is the propertyValue
            console.log('Property ID:', propertyId); // Log the propertyId
            
            const propertyName = this.propertyGroups.get(propertyId || '') || 'Unknown';
            console.log('Property Name:', propertyName); // Log the propertyName
  
            return {
              ...item,
              propertyName: propertyName,
            };
          });
          this.dataSource.data = mappedData;
          this.calculateCheckoutValues();
        },
        (error) => {
          console.error('Error fetching PO List:', error);
        }
      );
    }
  }

  calculateCheckoutValues(): void {
    this.subtotal = this.dataSource.data.reduce((acc, good) => acc + (good.subTotal || 0), 0);
    this.discount = this.dataSource.data.reduce((acc, good) => acc + (good.lineDiscount || 0), 0);
    this.tax = this.subtotal * 0.10; // 10% tax
    this.total = this.subtotal - this.discount + this.tax;

    // Log the calculated values for debugging
    console.log('Subtotal:', this.subtotal);
    console.log('Discount:', this.discount);
    console.log('Tax:', this.tax);
    console.log('Total:', this.total);
  }

  

 


  openCustomerDialog(): void {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result: CustomerDTO) => {
      if (result) {
        this.updateCustomerInfo(result);
      }
    });
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      panelClass: 'custom-dialog-container'
    });
    dialogRef.componentInstance.itemAdded.subscribe(() => {
      this.fetchPOList(); // Refresh the product list
    });
  }

  fetchOrderDetails(): void {
    if (this.storeId && this.loginName) {
      this.posService.generatePoHeader(this.storeId, this.loginName).subscribe(
        (data: POSDto) => {
          this.posHeader = data; // Assign the fetched order details
          
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    }
  }

  updateCustomerInfo(customer: CustomerDTO): void {
    this.selectedCustomer = customer;
  }
}