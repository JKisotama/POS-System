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

@Component({
  selector: 'app-pos-main',
  templateUrl: './pos-main.component.html',
  styleUrls: ['./pos-main.component.scss'] // Fixed typo here
})
export class PosMainComponent implements OnInit {
  
  
  constructor(public dialog: MatDialog, 
    private posService: POSService,
    private authenticationService : AuthenticationService,

   ) {}


  // Define columns to be displayed in the table
  displayedColumns: string[] = ['name', 'quantity', 'price', 'total'];
  
  // Data source for the table
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  storeId: string | null = null;

  showCards: boolean = false; // Controls the visibility of the cards
  currentCashierId: number = 1; // Tracks the cashier ID
  currentPosCreator: number = 1; // Tracks the POS creator
  posHeader?: POSDto; // Stores the response from API

  selectedCustomer?: CustomerDTO;

  // ViewChild to bind paginator and sort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Lifecycle hook to initialize data
  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  createOrder(): void {
    const cashierId = this.currentCashierId.toString();
    const posCreator = this.currentPosCreator.toString();
  
    // Step 1: Create the POS header
    if(this.storeId){
      this.posService.createPoHeader(this.storeId, cashierId, posCreator).subscribe(
        () => {
          // Step 2: Fetch the generated POS header
          if(this.storeId){
            this.posService.generatePoHeader(this.storeId, cashierId, posCreator).subscribe(
              (data: POSDto) => {
                this.posHeader = data; // Assign the returned data
                this.showCards = true; // Show the cards after a successful creation
                console.log('POS Header:', this.posHeader);
                this.incrementIds(); // Increment cashierId and posCreator
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

  // Increment the IDs for the next order
  incrementIds(): void {
    this.currentCashierId += 1;
    this.currentPosCreator += 1;
  }

  updateCustomerInfo(customer: CustomerDTO): void {
    this.selectedCustomer = customer;
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


