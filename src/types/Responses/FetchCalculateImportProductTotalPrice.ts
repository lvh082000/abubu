export interface FetchCalculateImportProductTotalPrice {
  data: CalculateImportProductType;
  success: boolean;
}

export interface CalculateImportProductType {
  products: Product[];
  receipt: Receipt;
  totalQuantity: number;
}

interface Product {
  barcode: string;
  code: string;
  description: string;
  discount: number;
  discountType: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface Receipt {
  actorId: number;
  actorName: string;
  code: any;
  paid: number;
  paymentRequire: number;
  provider: number;
  providerName: string;
  providerPhone: any;
  status: number;
  storeId: number;
  totalAmount: number;
}
