export interface FetchCreateOrUpdateImportProductResponse {
  success: boolean;
  data: CreateOrUpdateImportProductType;
}

export interface CreateOrUpdateImportProductType {
  id: number;
  storeId: number;
  code: string;
  type: string;
  provider: number;
  providerName: string;
  providerPhone: string;
  discount: number;
  discountType: string;
  actorId: number;
  actorName: string;
  status: number;
  paid: number;
  totalAmount: number;
  paymentRequire: number;
  paymentStatus: number;
  createdAt: number;
  updateAt: number;
  db_date: string;
  products: Product[];
  payments: any[];
  totalQuantity: number;
  isImportProduct: boolean;
}

export interface Product {
  id: number;
  quantity: number;
  price: number;
  discount: number;
  discountType: string;
  description: string;
  code: string;
  barcode: string;
}
