export interface FetchGetRefundDetailsResponse {
  success: true;
  data: RefundDetailsType;
}

export interface RefundDetailsType {
  id: number;
  storeId: number;
  type: number;
  guestId: number;
  guestName: string;
  code: string;
  orderId: number;
  orderCode: string;
  actorId: number;
  actorName: string;
  actorId2: number;
  actorName2: number;
  status: number;
  paymentStatus: number;
  priceSetting: number;
  discount: number;
  totalPrice: number;
  discountType: string;
  guestPhone: string;
  paymentRequire: number;
  paid: number;
  refundFee: number;
  otherRefund: number;
  createdAt: number;
  updateAt: number;
  products: Product[];
  payments?: [];
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  code: string;
  barcode: string;
  price: number;
  total: number;
}
