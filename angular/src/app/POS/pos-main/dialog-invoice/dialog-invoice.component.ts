import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { POSDetailDto, POSDto } from '../../../API/Staff/POS/model';
import { AuthenticationService } from '../../../API/authentication.service';
import { POSService } from '../../../API/Staff/POS/pos.service';
import { CustomerDTO } from '../../../API/Staff/Customer/model';
import { CustomerService } from '../../../API/Staff/Customer/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-invoice',
  templateUrl: './dialog-invoice.component.html',
  styleUrl: './dialog-invoice.component.scss'
})
export class DialogInvoiceComponent implements OnInit{

  storeId: string | null = null;
  loginName: string | null = null;
  fullName: string | null = null;

  dataSource = new MatTableDataSource<POSDetailDto>();

  displayedColumns: string[] = ['goodsNameProperty', 'quantityUnit', 'itemPrice', 'subTotal' , 'lineDiscount' ,  'lineTotal'];

  posHeader?: POSDto;
  currentPosNumber: string | null = null;
  propertyGroups: Map<string, string> = new Map();
  selectedCustomer?: CustomerDTO; 

  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;

  @Output() transactionCompleted = new EventEmitter<void>();
  

 


  constructor(
    private authenticationService: AuthenticationService,
    private posService: POSService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogInvoiceComponent>
  ) {}


  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
    this.loginName = this.authenticationService.getLoggedInUserName();
    this.selectedCustomer = this.customerService.getCustomer();
    this.fetchOrderDetails();
    console.log(this.data.posNumber)
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
    this.total = this.subtotal - this.discount

    // Log the calculated values for debugging
    console.log('Subtotal:', this.subtotal);
    console.log('Discount:', this.discount);
    console.log('Total:', this.total);
  }


  printInvoice(): void {
    const printContent = document.getElementById('print-invoice');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    if(this.storeId){
      this.posService.finalizeTransaction(
        this.storeId,
        this.data.posNumber,
        this.data.customerPay,
        this.data.customerName,
        this.data.paymentMethod
      ).subscribe({
        next: () => {
          if (printContent && WindowPrt) {
            WindowPrt.document.write('<html><head><title>Print Invoice</title>');
  
            // Copy all stylesheets from the main document
            Array.from(document.styleSheets).forEach((styleSheet) => {
              if (styleSheet.href) {
                WindowPrt.document.write(`<link rel="stylesheet" type="text/css" href="${styleSheet.href}">`);
              } else if (styleSheet.ownerNode && styleSheet.ownerNode.nodeName === 'STYLE') {
                WindowPrt.document.write(`<style>${(styleSheet.ownerNode as HTMLStyleElement).innerHTML}</style>`);
              }
            });
  
            WindowPrt.document.write('</head><body>');
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.document.write('</body></html>');
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();

            this.transactionCompleted.emit();
            this.dialogRef.close();
          }
        },
        error: (error) => {
          console.error('Error finalizing transaction:', error);
        }
      });
    }
    }
}
