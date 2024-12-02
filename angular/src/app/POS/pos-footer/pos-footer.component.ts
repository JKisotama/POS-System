import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInvoiceComponent } from '../pos-main/dialog-invoice/dialog-invoice.component';

@Component({
  selector: 'app-pos-footer',
  templateUrl: './pos-footer.component.html',
  styleUrl: './pos-footer.component.scss'
})
export class PosFooterComponent {

  constructor(
    public dialog: MatDialog,
   
  ) {}



  openInvoiceDialog(): void {
    const dialogRef = this.dialog.open(DialogInvoiceComponent, {
      
    })
  }

}
