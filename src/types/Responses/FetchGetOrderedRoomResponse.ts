export interface FetchGetOrderedRoomResponse {
  success: boolean;
  data: Data;
}

interface Data {
  total: number;
  totalPage: number;
  list: OrderedRoomItemType[];
}

export interface OrderedRoomItemType {
  id: number;
  name: string;
  waiting: WaitingRoomItemType[];
}

export interface WaitingRoomItemType {
  id: number;
  locationId: number;
  paymentRequire: number;
  code: string;
}
