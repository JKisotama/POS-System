import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInvoiceComponent } from '../pos-main/dialog-invoice/dialog-invoice.component';
import { AuthenticationService } from '../../API/Admin/authentication.service';
import { POSService } from '../../API/Admin/POS/pos.service';

@Component({
  selector: 'app-pos-footer',
  templateUrl: './pos-footer.component.html',
  styleUrl: './pos-footer.component.scss'
})
export class PosFooterComponent implements OnInit {

  @Input() customerName: string | null = null;
  @Input() posNumber: string | null = null;
  @Input() paymentMethod: number = 0;
  @Input() customerPay: number;
  storeId: string | null = null;


  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private posService: POSService,

  ) {}

  ngOnInit(): void {
    this.storeId = this.authenticationService.getStoreIdUser();
  }

  openInvoiceDialog(): void {
    console.log('Finalizing transaction with data:');
    console.log('Customer Name:', this.customerName);
    console.log('POS Number:', this.posNumber);
    console.log('Payment Method:', this.paymentMethod);
    console.log('Customer Pay:', this.customerPay);

    if (this.storeId && this.customerName && this.posNumber) {
        this.posService.finalizeTransaction(
            this.storeId,
            this.posNumber,
            this.customerPay,
            this.customerName, // This is the payer
            this.paymentMethod
        ).subscribe({
            next: (response) => console.log('Transaction finalized:', response),
            error: (error) => console.error('Error finalizing transaction:', error),
        });
    } else {
        console.error('Missing required data for finalizing transaction.');
    }
}



  // openInvoiceDialog(): void {
  //   const dialogRef = this.dialog.open(DialogInvoiceComponent, {
      
  //   })
  // }

}
