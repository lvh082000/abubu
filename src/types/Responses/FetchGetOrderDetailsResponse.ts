import {
  BaseProductType,
  OtherRevenueType,
  PaymentMethodType,
  ShippingPaymentMethodType,
  OrderPaymentStatusType,
} from 'types/Properties';

export interface FetchGetOrderDetailsResponse {
  success: boolean;
  data: OrderDetailsType;
}

export interface ShippingOrderInfoType {
  codAmount: number;
  collected: number;
  createdAt: number | null;
  doneAt: number | null;
  exportAt: number | null;
  fee: number;
  id: number;
  packedAt: number | null;
  shipId: number;
  shipperId: number;
  shipperName: string;
  shipperPhone: string;
  weight: number;
  deposit: number;
  payment: {
    method: PaymentMethodType;
    account: string;
    name: string;
    amount: number;
  };
}

export interface OrderDetailsType {
  id: number;
  storeId: number;
  type: number;
  guestId: number;
  discount: number;
  discountType: string;
  code: string;
  guestName: string;
  guestPhone: string;
  actorId: number;
  actorName: string;
  status: number;
  paymentStatus: OrderPaymentStatusType;
  priceSetting: number;
  locationId: number;
  totalPrice: number;
  paymentRequire: number;
  paid: number;
  codFee: number;
  address: string;
  createdAt: number;
  updateAt: number;
  db_date: string;
  surcharges: OtherRevenueType[];
  products: OrderedProductType[];
  total: number;
  totalQuantity: number;
  payments: OrderedPaymentType[];
  discountValue: number;
  totalSurcharge: number;
  shipInfo: ShippingOrderInfoType;
  locationName: string;
  paymentType: ShippingPaymentMethodType;
}

export interface OrderedProductType extends BaseProductType {
  price: number;
  total?: number;
  code?: string;
}

export interface OrderedPaymentType {
  id: number;
  amount: number;
  receive: number;
  return: number;
  method: PaymentMethodType;
  name: string;
  account: string;
  createdAt: number;
  inputType: string;
}
