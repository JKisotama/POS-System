import { Component } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class POSComponent {

  checkoutData: {
    customerName: string | null;
    posNumber: string | null;
    paymentMethod: number | null;
    customerPay: number | null;
  } = {
    customerName: null,
    posNumber: null,
    paymentMethod: null,
    customerPay: null,
  };

  handleCheckoutData(data: {
    customerName: string | null;
    posNumber: string | null;
    paymentMethod: number;
    customerPay: number;
  }): void {
    this.checkoutData = { ...data }; // Spread operator ensures object structure is maintained
  }

  getPaymentMethod(): number {
    return this.checkoutData.paymentMethod ?? 0; // Default to 0 if null
  }

  getCustomerPay(): number {
    return this.checkoutData.customerPay ?? 0; // Default to 0 if null
  }

}
