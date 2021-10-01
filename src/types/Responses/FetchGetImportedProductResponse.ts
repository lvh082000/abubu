export interface FetchGetImportedProductResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  total: number;
  totalPage: number;
  list: ImportedType[];
}

export interface ImportedType {
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
