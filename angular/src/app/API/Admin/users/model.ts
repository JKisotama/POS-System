export interface UserDTO {
    storeId?: string;
    loginName?: string;
    fullName?: string;
    passWord?: string;
    address?: string;
    phone?: string;
    doB?: string;
    email?: string;
    gender?: string;
    userLevel?: number;
    userStatus?: number;
    userLanguage?: string;
    userType?: number;
    picture?: string;
}

export interface Menu {
    menuId: number;
    englishText: string;
    localText: string;
    investText: string;
    linkedView: string | null;
    menuOrder: number;
    storeId: string;
  }