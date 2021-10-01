export interface FetchCalculateOrderPriceResponse {
  success: true;
  data: CalculateOrderPriceType;
}

export interface CalculateOrderPriceType {
  totalProductQuantity: number;
  totalProductAmount: number;
  totalSurcharge: number;
  totalAmount: number;
  discountValue: number;
  shipFee: number;
  paymentRequire: number;
  products: Product[];
  surchares: Surchare[];
}

interface Product {
  barcode: string;
  code: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  remaining: number;
  total: number;
}

interface Surchare {
  id: number;
  name: string;
  value: number;
  uom: string;
  amount: number;
}
