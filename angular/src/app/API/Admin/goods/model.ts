import { SellPriceDTO } from "../Sell Price/model";






export interface GoodsDTO {
    groupId?: string,
    goodsId?: string,
    goodsName?: string, 
    goodsBrand?: string,
    goodsStatus?: string,
    picture?: string,
    storeId?: string,
    tblSellprices: SellPriceDTO[];
    selectedPrice?: number;
    quantity?: number;
    total?: number;
}