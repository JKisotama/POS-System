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

@Component({
  selector: 'app-pos-main',
  templateUrl: './pos-main.component.html',
  styleUrls: ['./pos-main.component.scss'] // Fixed typo here
})
export class PosMainComponent implements OnInit {
  
  
  constructor(public dialog: MatDialog, 
    private posService: POSService,
    private authenticationService : AuthenticationService,
    private fb: FormBuilder
   ) {}


  // Define columns to be displayed in the table
  displayedColumns: string[] = ['name', 'unit', 'quantity', 'price', 'total'];
  
  // Data source for the table
  dataSource = new MatTableDataSource<GoodsDTO>();
  storeId: string | null = null;

  showCards: boolean = false; // Controls the visibility of the cards
  currentCashierId: number = 1; // Tracks the cashier ID
  currentPosCreator: number = 1; // Tracks the POS creator
  posHeader?: POSDto; // Stores the response from API
  orders: POSDto[] = [];

  selectedCustomer?: CustomerDTO;
  form: FormGroup;

  // ViewChild to bind paginator and sort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Lifecycle hook to initialize data
  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const storedCashierId = localStorage.getItem('currentCashierId');
    const storedPosCreator = localStorage.getItem('currentPosCreator');
  
    // Parse stored values or fallback to 1 if they are not available or invalid
    this.currentCashierId = storedCashierId ? parseInt(storedCashierId, 10) : 1;
    this.currentPosCreator = storedPosCreator ? parseInt(storedPosCreator, 10) : 1;
    this.fetchOrders();
    this.getGoodsList();
    this.buildForm();
    
  }

  buildForm(){
    this.form = this.fb.group({
      quantity: ['', [Validators.required]],
    });
  }

  getGoodsList(): void {
   if(this.storeId){
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

  fetchOrders(): void {
    if(this.storeId){
      this.posService.getPoHeadersPaged(this.storeId).subscribe(
        (response) => {
          this.orders = response.items; // Assign the items array to orders
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }

  openCustomerDialog(): void {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      width: '90vw',
      maxWidth: '90vw',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe((result: CustomerDTO) => {
      if (result) {
        this.updateCustomerInfo(result);
      }
    });
  }

  fetchOrderDetails(cashierId: string, posCreator: string): void {
    if(this.storeId){
      this.posService.generatePoHeader(this.storeId, cashierId, posCreator).subscribe(
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

  createOrder(): void {
    const cashierId = this.currentCashierId.toString();
    const posCreator = this.currentPosCreator.toString();
  
    if (this.storeId) {
      // Step 1: Create the POS header
      this.posService.createPoHeader(this.storeId, cashierId, posCreator).subscribe(
        () => {
          if (this.storeId) {
            // Step 2: Fetch the generated POS header
            this.posService.generatePoHeader(this.storeId, cashierId, posCreator).subscribe(
              (data: POSDto) => {
                this.posHeader = data; // Assign the returned data
                this.showCards = true; // Show the cards after a successful creation
                console.log('POS Header:', this.posHeader);
  
                // Increment IDs only after a successful order
                this.incrementIds();
  
                // Step 3: Fetch all orders again
                if (this.posHeader?.id) {
                  // Ensure `id` is defined
                  this.fetchOrdersAndSelectOrder(this.posHeader.id);
                } else {
                  console.error('POS Header ID is undefined.');
                }
              },
              (error) => {
                console.error('Error fetching POS header:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error creating POS header:', error);
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
  
}

// Define the Product interface outside the component class
interface Product {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

// Sample data for the table
const ELEMENT_DATA: Product[] = [
  { name: 'Product 1', quantity: 10, price: 100, total: 1000 },
  { name: 'Product 2', quantity: 5, price: 200, total: 1000 },
  { name: 'Product 3', quantity: 2, price: 300, total: 600 },
  { name: 'Product 4', quantity: 1, price: 400, total: 400 },
  { name: 'Product 5', quantity: 8, price: 150, total: 1200 },
 
];


