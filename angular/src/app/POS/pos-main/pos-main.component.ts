import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { POSDetailDto, POSDto } from '../../API/Staff/POS/model';
import { POSService } from '../../API/Staff/POS/pos.service';
import { AuthenticationService } from '../../API/authentication.service';
import { CustomerDTO } from '../../API/Staff/Customer/model';
import { GoodsDTO } from '../../API/Staff/goods/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { DialogInvoiceComponent } from './dialog-invoice/dialog-invoice.component';
import { PropertyGroupDTO } from '../../API/Staff/Property Group/model';
import { PropertyGroupService } from '../../API/Staff/Property Group/propertyGroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../API/Staff/Customer/customer.service';
import { ConfirmDialogComponent } from '../../confirm-dialog.component';

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
    private customerService: CustomerService
  ) {}

  // Define columns to be displayed in the table
  displayedColumns: string[] = ['goodsName', 'barcode', 'unit', 'propertyName' , 'propertyValue' ,'quantity', 'itemPrice', 'subTotal', 'lineDiscount', 'lineTotal', 'remove'];

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

  fetchOrderDetails(): void {
    if (this.storeId && this.loginName) {
      this.posService.generatePoHeader(this.storeId, this.loginName).subscribe(
        (data: POSDto) => {
          this.posHeader = data;
          this.currentPosNumber = data.posNumber || null; // Update currentPosNumber
          this.fetchPOList(); // Fetch the PO List after getting the order details
        },
        (error) => {
          console.error('Error fetching order details:', error);
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
      width: '80vw',
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

  hangPO(pos: POSDto): void {
    const message = pos.posStatus === 3 
    ? 'Are you sure you want to bring this Purchase back?' 
    : 'Are you sure you want to hang this Purchase Order?';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
      panelClass: 'custom-dialog-container',
    });
    

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.storeId && this.currentPosNumber) {
        this.posService.hangPo(this.storeId, this.currentPosNumber).subscribe({
          next: () => {
            this.snackBar.open('Hang order successfully!', 'Close', {
              duration: 3000, // Duration in milliseconds
              panelClass: ['snackbar-success'], // Use the success class
            });
            console.log('PO successfully hung');
          },
          error: (error) => {
            this.snackBar.open('Error Hanging item. No Products selected', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'], // Use the error class
            });
            console.error('Error hanging PO:', error);
          },
        });
      } else {
        this.snackBar.open('Hang operation canceled', '', {
          duration: 2000,
          panelClass: ['snackbar-error'],
        });
      }
    });
  }

  confirmDelete(pos: POSDetailDto): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          message: 'Are you sure you want to delete this item?'
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.deleteItem(pos);
        } else {
          this.snackBar.open('Delete operation canceled', '', {
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        }
      })
    }

  deleteItem(pos: POSDetailDto): void {
    if (this.storeId && pos.posNumber && pos.itemOrder) {
      this.posService.deleteItem(this.storeId, pos.posNumber, pos.itemOrder).subscribe(
        () => {
          this.snackBar.open('Item deleted successfully!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
          this.fetchPOList(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting item:', error);
          this.snackBar.open('Error deleting item.', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
        }
      );
    }
  }



  updateCustomerInfo(customer: CustomerDTO): void {
    this.selectedCustomer = customer;
    this.emitCheckoutData();
    this.customerService.setCustomer(customer);
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

  reloadData(): void {
    this.fetchOrderDetails();
    this.fetchPoHangList();
  }


}