export interface FetchGetInventoryResponse {
  success: boolean;
  data: InventoryDetailsType;
}

export interface InventoryDetailsType {
  id: number;
  storeId: number;
  code: string;
  description: string;
  actor: number;
  actor2: number;
  actorName: string;
  actorName2: string;
  status: number;
  done: number;
  createdAt: number;
  updateAt: number;
  db_date: string;
  products: InventoryProductDetailsType[];
}

export interface InventoryProductDetailsType {
  id: number;
  name: string;
  stock: number;
  code: string;
  actual: number;
  deviated: number;
}
