import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pos-main',
  templateUrl: './pos-main.component.html',
  styleUrls: ['./pos-main.component.scss'] // Fixed typo here
})
export class PosMainComponent implements OnInit {
  
  constructor(public dialog: MatDialog) {}

  openCustomerDialog(): void {
    this.dialog.open(DialogCustomerComponent, {
      width: '900px',
      height: '500px'
    });
  }







  // Define columns to be displayed in the table
  displayedColumns: string[] = ['name', 'quantity', 'price', 'total'];
  
  // Data source for the table
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);

  // ViewChild to bind paginator and sort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Lifecycle hook to initialize data
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
