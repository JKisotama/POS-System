export interface POSDto {
    id?: string; // Optional because JSON property uses $id, can be mapped in transformation
    posNumber: string;
    posDate: string;
    cashierId: string;
    customerId?: string;
    customerName?: string;
    posStatus: number;
    posTotal: number;
    posDiscount: number;
    posTopay: number;
    posCustomerpay?: number;
    posExchange?: number;
    posPaymenttype?: string;
    posPaymentmethod?: string;
    posCounter: number;
    posCreator: string;
    paymentDate?: string;
    payer?: string;
    cancelDate?: string;
    cancelPerson?: string;
    storeId: string;
}