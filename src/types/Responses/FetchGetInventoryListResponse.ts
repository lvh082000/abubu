export interface FetchGetInventoryListResponse {
  success: boolean;
  data: {
    total: number;
    totalPage: number;
    list: Array<InventoryType>;
  };
}

export interface InventoryType {
  id: number;
  storeId: number;
  code: string;
  description: string;
  actor: number;
  actor2: number;
  actorName: string;
  actorName2: string;
  status: number;
  done: boolean;
  createdAt: number;
  updateAt: number;
  db_date: string;
}
