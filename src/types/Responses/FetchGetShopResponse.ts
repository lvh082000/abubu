export interface FetchGetShopResponse {
  success: boolean;
  data: ShopDetailsType;
}

export interface ShopDetailsType {
  id: number;
  owner: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  avatar: string;
  costPrice: number;
  sellPrice: number;
  createdAt: number;
  updateAt: number;
  db_date: string;
}
