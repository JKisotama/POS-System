import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
  ) {}

  // Define columns to be displayed in the table
  displayedColumns: string[] = ['goodsName', 'barcode', 'unit', 'propertyName' , 'propertyValue' ,'quantity', 'itemPrice', 'subTotal', 'lineDiscount', 'lineTotal'];

  // Data source for the table
  dataSource = new MatTableDataSource<POSDetailDto>();
  storeId: string | null = null;
  loginName: string | null = null;
  fullName: string | null = null;

  showCards: boolean = false; // Controls the visibility of the cards
  currentCashierId: number = 1; // Tracks the cashier ID
  currentPosCreator: number = 1; // Tracks the POS creator
  posHeader?: POSDto;
  posHangList?: POSDto[];
  orders: POSDto[] = [];
  currentPosNumber: string | null = null;


  selectedCustomer?: CustomerDTO;
  form: FormGroup;

  // Property to track the active order
  activeOrderId: string | null = null;


  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;
  propertyGroups: Map<string, string> = new Map();
  paymentMethod: number = 0;


  // ViewChild to bind paginator and sort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Output() checkoutData = new EventEmitter<{
    customerName: string | null;
    posNumber: string | null;
    paymentMethod: number;
    customerPay: number;
  }>();

  // Lifecycle hook to initialize data
  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.fullName = this.authenticationService.getLoggedInFullName();
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
    this.emitCheckoutData();
    this.form.get('customerPay')?.valueChanges.subscribe(() => {
      this.emitCheckoutData();
    });
    this.fetchPoHangList();
    console.log(this.fullName);
  }

  buildForm() {
    this.form = this.fb.group({
      quantity: ['', [Validators.required]],
      customerPay: ['', [Validators.required]],
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
    if (this.storeId && this.currentPosNumber) {
      this.posService.getPOList(this.storeId, this.currentPosNumber).subscribe(
        (data: POSDetailDto[]) => {
          const mappedData = data.map(item => {
            const propertyId = item.property;
            const propertyName = this.propertyGroups.get(propertyId || '') || 'Unknown';
            return { ...item, propertyName: propertyName };
          });
  
          this.dataSource.data = mappedData;
  
          // Update currentPosNumber
          if (this.dataSource.data.length > 0) {
            this.currentPosNumber = this.dataSource.data[0].posNumber || null;
          } else {
            this.fetchOrderDetails(); // Fallback to fetchOrderDetails if no data
          }
  
          this.calculateCheckoutValues();
          this.emitCheckoutData();
        },
        (error) => {
          console.error('Error fetching PO List:', error);
        }
      );
    }
  }

  incrementPosNumber(posNumber: string): string {
    const prefix = posNumber.match(/^[A-Za-z]+/)?.[0] || '';
    const numberPart = posNumber.replace(/^[A-Za-z]+/, ''); // Extract the number part
    const incrementedNumber = (parseInt(numberPart, 10) + 1).toString().padStart(numberPart.length, '0'); // Increment and pad back
    return `${prefix}${incrementedNumber}`;
  }
  calculateCheckoutValues(): void {
    this.subtotal = this.dataSource.data.reduce((acc, good) => acc + (good.subTotal || 0), 0);
    this.discount = this.dataSource.data.reduce((acc, good) => acc + (good.lineDiscount || 0), 0);
    this.total = this.subtotal - this.discount

    // Log the calculated values for debugging
    console.log('Subtotal:', this.subtotal);
    console.log('Discount:', this.discount);
    console.log('Total:', this.total);
  }

  

 


  openCustomerDialog(): void {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      panelClass: 'custom-dialog-container',

    });

    dialogRef.afterClosed().subscribe((result: CustomerDTO) => {
      if (result) {
        this.updateCustomerInfo(result);
      }
    });
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '80vw',
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
          this.posHeader = data;
          this.currentPosNumber = data.posNumber || null; // Update currentPosNumber
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    }
  }

  fetchPoHangList(): void {
    if (this.storeId) {
        this.posService.getPoHangList(this.storeId).subscribe({
            next: (data: POSDto[]) => {
                this.posHangList = data;
                console.log('PO Hang List:', this.posHangList);
            },
            error: (error: any) => {
                console.error('Error fetching PO Hang List:', error);
            },
        });
    } else {
        console.warn('Store ID is not provided');
    }
  }

  hangPO(){
    if(this.storeId && this.currentPosNumber) {
      this.posService.hangPo(this.storeId, this.currentPosNumber).subscribe({
        next: () => {
          this.snackBar.open('Hang order successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
            panelClass: ['snackbar-success'], // Use the success class
        });
          console.log('PO successfully hung');
      },
      error: (error) => {
        this.snackBar.open('Error Hanging item. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'], // Use the error class
      });
          console.error('Error hanging PO:', error);
      },
      })
    }
  }



  updateCustomerInfo(customer: CustomerDTO): void {
    this.selectedCustomer = customer;
    this.emitCheckoutData();
  }

  setPaymentMethod(method: number): void {
    this.paymentMethod = method;
    this.emitCheckoutData();
    
  }

  emitCheckoutData(): void {
    this.checkoutData.emit({
      customerName: this.selectedCustomer?.customerName || null,
      posNumber: this.currentPosNumber,
      paymentMethod: this.paymentMethod,
      customerPay: this.form.get('customerPay')?.value,
    });
  }
}