import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { POSDto } from '../../API/Admin/POS/model';
import { POSService } from '../../API/Admin/POS/pos.service';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { CustomerDTO } from '../../API/Admin/Customer/model';
import { GoodsDTO } from '../../API/Admin/goods/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { DialogInvoiceComponent } from './dialog-invoice/dialog-invoice.component';

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
    private fb: FormBuilder
  ) {}

  // Define columns to be displayed in the table
  displayedColumns: string[] = ['name', 'unit', 'quantity', 'price', 'total'];

  // Data source for the table
  dataSource = new MatTableDataSource<GoodsDTO>();
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
    this.getGoodsList();
    this.buildForm();
    this.fetchOrderDetails();
  }

  buildForm() {
    this.form = this.fb.group({
      quantity: ['', [Validators.required]],
    });
  }

  getGoodsList(): void {
    if (this.storeId) {
      this.posService.getGoodsList(this.storeId).subscribe(
        (response) => {
          // Initialize the selectedPrice for each good
          this.dataSource.data = response.items.map((item: GoodsDTO) => ({
            ...item,
            selectedPrice: item.tblSellprices[0]?.sellPrice || 0,
          }));
        },
        (error) => {
          console.error('Error fetching goods list:', error);
        }
      );
    }
  }

  onUnitChange(good: GoodsDTO, event: Event): void {
    const selectedUnit = (event.target as HTMLSelectElement).value;
    const matchingPrice = good.tblSellprices.find(
      (price) => price.goodsUnit === selectedUnit
    );
    good.selectedPrice = matchingPrice ? matchingPrice.sellPrice : 0;
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
    dialogRef.afterClosed().subscribe(() => {
      
    })
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


  fetchOrdersAndSelectOrder(orderId: string): void {
    if (this.storeId) {
      this.posService.getPoHeadersPaged(this.storeId).subscribe(
        (response) => {
          this.orders = response.items; // Update the orders list
          console.log('Updated Orders:', this.orders);

          // Step 4: Retrieve the specific order
          const selectedOrder = this.orders.find(order => order.id === orderId);

          if (selectedOrder) {
            console.log('Selected Order:', selectedOrder);
            this.posHeader = selectedOrder; // Update the POS header with the specific order
          } else {
            console.error('Order not found in the updated list.');
          }
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }

  // Increment the IDs for the next order
  incrementIds(): void {
    this.currentCashierId += 1;
    this.currentPosCreator += 1;

    // Persist updated IDs in localStorage
    localStorage.setItem('currentCashierId', this.currentCashierId.toString());
    localStorage.setItem('currentPosCreator', this.currentPosCreator.toString());
  }

  updateCustomerInfo(customer: CustomerDTO): void {
    this.selectedCustomer = customer;
  }

  updateTotal(good: GoodsDTO): void {
    good.total = (good.quantity ?? 1) * (good.selectedPrice ?? 0);
  }

  setActiveOrder(orderId: string): void {
    this.activeOrderId = orderId;
  }

  isActiveOrder(orderId: string): boolean {
    return this.activeOrderId === orderId;
  }
}