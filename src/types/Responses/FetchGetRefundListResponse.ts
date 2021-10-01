export interface FetchGetRefundListResponse {
  success: boolean;
  data: {
    total: number;
    totalPage: number;
    list: RefundItemType[];
  };
}

export interface RefundItemType {
  id: number;
  type: number;
  code: string;
  guestName: string;
  guestPhone: string;
  createdAt: number;
  status: number;
  paid: number;
  paymentRequire: number;
  totalPrice: number;
}
