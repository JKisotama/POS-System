export interface POSDto {
    id?: string; 
    posNumber: string;
    posDate?: string;
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

export interface POSDetailDto {
    posNumber?: string;
    posCreator?: string;
    itemOrder?: number;
    goodsId?: string;
    barCode?: string;
    goodsName?: string;
    property?: string;
    goodProperty?: string;
    goodsUnit?: string;
    quantity?: number;
    itemPrice?: number;
    subTotal?: number;
    lineDiscount?: number;
    lineTotal?: number;
    storeId?: string;
    propertyName?: string;

}




