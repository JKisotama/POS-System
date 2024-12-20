export interface SaleReport {
    posNumber: string;
    posDate: string;
    cashierId: string;
    customerId: string | null;
    customerName: string;
    posStatus: string | null;
    posTotal: number;
    posDiscount: number;
    posTopay: number;
    posCustomerpay: number | null;
    posExchange: number | null;
    posPaymenttype: string | null;
    posPaymentmethod: number;
    posCounter: number;
    posCreator: string | null;
    paymentdate: string | null;
    payer: string | null;
    cancelDate: string | null;
    cancelPerson: string | null;
    storeId: string | null;
}

export interface GoodsSoldReport {
    id: number;
    posNumber: string | null;
    itemOrder: number | null;
    goodsId: string;
    barcode: string | null;
    goodsName: string;
    itemUnit: string;
    property: string | null;
    propertyValue: string;
    itemQuantity: number;
    itemPrice: number | null;
    subTotal: number;
    lineDiscount: number;
    lineTotal: number;
    storeId: string | null;
    posNumberNavigation: string | null;
  }