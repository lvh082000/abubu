export interface FetchGetReturnOrImportedGoodsResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  total: number;
  totalPage: number;
  list: ReturnOrImportedType[];
}

export interface ReturnOrImportedType {
  id: number;
  type: string;
  code: string;
  guestName: string;
  guestPhone: string;
  createdAt: number;
  status: number;
  paid: number;
  paymentRequire: number;
  totalAmount: number;
}
