import { GoodsDTO } from "../goods/model";

export interface GoodsGroupDTO {
    groupId?: string,
    groupName?: string,
    groupStatus?: number,
    storeId?: string,
    tblGoods: GoodsDTO[];
    expanded?: boolean;

}