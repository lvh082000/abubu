import {OrderType} from 'types/Properties';

export interface FetchGetOrdersResponse {
  success: boolean;
  data: {
    total: number;
    totalPage: number;
    list: OrderItemType[];
  };
}

export interface OrderItemType {
  id: number;
  type: OrderType;
  code: string;
  guestName: string;
  guestPhone: string;
  createdAt: number;
  status: number;
  paid: number; // Số đã thanh toán
  paymentRequire: number; // Số cần thanh toán
  totalPrice: number; // Tổng giá trị đơn hàng chưa qua giảm giá.
  locationId: number;
  locationName: string;
}
