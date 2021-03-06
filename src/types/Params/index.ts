import {RadioOption} from 'components/FormControls';
import {
  OrderType,
  PartnerType,
  PaymentMethodType,
  TotalCheckoutType,
  UOMType,
  OrderDiscountType,
  OrderPaymentStatusType,
  ImportedProductType,
  ReturnStatusType,
  BaseProductType,
  BookByRoomOrderStatusType,
  OrderStatusType,
  ShippingPaymentMethodType,
  ImportStatusType,
  CashBookType,
  CashBookReceiptType,
  SelectSharedItemType,
} from 'types/Properties';
import {
  OrderDetailsType,
  OrderedProductType,
} from 'types/Responses/FetchGetOrderDetailsResponse';

export interface FetchLoginParams {
  email: string;
  password: string;
}

export interface FetchRegisterParams {
  fullName: string;
  email: string;
  password: string;
}

export interface ChangePasswordParams {
  password: string;
  newPassword: string;
}

export interface SelectPaymentAccountParams {
  options: Array<RadioOption>;
  initialIndex: number | undefined;
  onResult?: (data: RadioOption) => void;
  type: PaymentMethodType;
}

export interface ShippingOrderDetailsParams extends OrderDetailsType {
  isProcessing?: boolean;
}

export interface CreateOrUpdateCashBookParams {
  id?: number;
  type: CashBookType;
  receiptType: CashBookReceiptType;
}

export interface ReportParams {
  title: string;
}

export interface FetchCreateOrUpdateShopParams {
  name: string;
  address: string;
  avatar: string;
  id?: number;
}

export interface FetchUpdateProfileParams {
  email: string;
  phone: string;
  fullName: string;
  avatar: string;
  // firebaseToken: string;
  // dob: number;
  // setting: ProfileSettingType;
}

export interface UploadedFileParams {
  uri: string;
  type: string;
  name: string;
}

export interface ProductPropertyType {
  name: string;
  attribute: string;
  propId: number;
}

export interface FetchCreateOrUpdateProductParams {
  name: string;
  images: Array<string>;
  properties?: Array<ProductPropertyType>;
  barcode?: string;
  code?: null;
  groupId?: number | null;
  brandId?: number | null;
  sellPrice: number;
  costPrice: number;
  abubuPrice?: number;
  quantity: number;
  weight?: number | null;
  locationId?: number | null;
  description?: string;
  showOnWeb?: boolean;
  goodSale?: boolean;
  promotion?: boolean;
  isNew?: boolean;
  avability?: boolean;
}

export interface RequestParams {
  page?: number | null;
  limit?: number | null;
  keyword?: string | null;
  sort?: string | null;
  refreshId?: number;
  filter?: string | null | number;
  extraFilterParams?: Record<
    string,
    string | number | undefined | null | boolean
  >;
}

export interface FetchGetProductsParams extends RequestParams {
  priceSetting?: number;
}

export interface FetchCreateOrUpdatePriceParams {
  name: string;
  type: 0 | 1;
  value: number;
  uom: UOMType;
}

export interface FetchCreateOrUpdateInventoryParams {
  isDone: boolean;
  description?: string | null;
  products: Array<{
    id: number;
    actual: number;
  }>;
  id?: number | undefined;
}

export interface FetchGetInventoryParams extends RequestParams {
  status?: number;
  done?: boolean | null;
  startTimestamp?: number;
  endTimestamp?: number;
}

export interface FetchCreateOrderParams {
  type: OrderType; // 0: ????n tr???c ti???p, 1: ????n ship cod, 2: ????n b??n ph??ng
  guestId: number; // -1: Kh??ch l??? (truy???n m???c ?????nh n???u l?? kh??ch l???). Kh??ch quen truy???n id (l??m sau).
  priceSetting: -1; // ID c???a b???ng gi?? (price-setting)
  address: string;
  locationId: number; // Truy???n id c???a location v???i filter l?? b??n ph??ng khi l???y danh s??ch location
  discount: {
    type: string; // Ki???u gi???m [percent,cash]
    value: number; // Gi?? tr??? gi???m. percent [0-100], cash: s??? l?????ng t??y ??
  };
  products: Array<{
    id: number; // Id c???a product.
    quantity: number; // S??? l?????ng
  }>;
  payments: Array<{
    method: PaymentMethodType; // Ph????ng th???c thanh to??n [cash,bank,card]
    receive: number; // S??? ti???n nh???n
    return: number; // S??? ti???n ???? tr??? l???i
  }>;
  surcharges: number[]; // ID c??c kho???n ph??? thu (l???y t??? API list).
}

export interface FetchGetPartnersParams extends RequestParams {
  type: PartnerType;
  startTimestamp?: number; // N???u mu???n l???y h???t th?? truy???n 1 -> now
  endTimestamp?: number;
}

export interface CalculateTotalOrderPriceParams {
  products: Array<{id: number; quantity: number}>;
  discount?: OrderDiscountType;
  surcharges?: Array<number>;
  priceId?: number;
  codFee?: number;
}

export interface OrderPaymentParams {
  method: PaymentMethodType; // cash bank card.
  receive: number; // input
  return: number; // T??? nh???p v??o t??nh d???a tr??n s??? ti???n c???n tr??? - s??? ???? tr???. N???u kh??ng th?? nh???p tay.
  name: string | null; // T??n tk ng??n h??ng... kh??ng c?? th?? truy???n null
  account: string | null; // S??? tk ng??n h??ng, kh??ng c?? truy???n null
  isNew: true; // Nh???ng thanh to??n m???i nh???p lu??n truy???n field n??y = true, tr??nh nh???m l???n vs nh???ng thanh to??n ???? c?? tr?????c ????.
}

export interface CreateOrderParams extends CalculateTotalOrderPriceParams {
  type: OrderType; // Type=0: ????n h??ng tr???c ti???p.
  guestId: number;
  payments: Array<OrderPaymentParams>;
  roomId?: number;
}

export interface OrderCheckoutParams extends TotalCheckoutType {
  type: OrderType;
  guestId: number;
  priceId: number;
  products: Array<OrderedProductType>;
  roomId?: number;
  id?: number;
}

export interface FetchGetOrdersParams extends RequestParams {
  type: OrderType | -1; // -1
  startTimestamp?: number; // N???u mu???n l???y h???t th?? truy???n 1 -> now
  endTimestamp?: number;
  status?: OrderStatusType | -1;
  paymentStatus?: OrderPaymentStatusType;
}

export interface FetchUpdateTakeAwayPaymentOrderParams {
  id: number;
  payments: Array<OrderPaymentParams>;
}

export interface FetchUpdateBookByRoomPaymentOrderParams {
  id: number;
  payments: Array<OrderPaymentParams>;
  newStatus: BookByRoomOrderStatusType;
  discount?: {
    type: string;
    value: number;
  };
  products?: Pick<BaseProductType, 'id' | 'quantity'>[];
  surcharges?: number[]; // Danh sach id ph??? thu
  priceSetting?: number; // ID b???ng gi??
}

export interface FetchUpdateShippingPaymentOrderParams {
  id: number;
  payments: Array<OrderPaymentParams>;
  newStatus: number; // T???i ??i???m n??y n???u ch??a ch???t th??ng tin th?? truy???n = null. N???u ???? ch???t th?? truy???n = 1
  priceSetting?: number; // ID b???ng gi??
  codFee?: number; // Ph?? cod shop thu
  shipInfo?: {
    shipperId: number; // L???y partner id type = shipper. Ch??a c?? th?? ????? -1 qua b?????c ti???p theo c???p nh???t sau
    fee: number; // Ph?? tr??? cho shipper: ????? m???c ?????nh l?? 0 n???u ch??a c??.
    shipperPhone: string; // S??? ??i???n tho???i shipper l???y t??? partner. Ch??a c?? ????? null ho???c r???ng
    shipperName: string; // Nh?? tr??n
    weight: number; // Tr???ng l?????ng g??i h??ng (gram).
    codAmount: number; // S??? ti??n ???ng tr?????c c???a shipper: L?? s??? ti???n kh??ch c???n tr??? - ph?? ship. V?? d??? kh??ch c???n tr??? (paymentRequire) 105.000??, ph?? ship 5000??. Th?? ti???n thu h??? s??? l?? 100.000.
  };
  discount?: {
    type: string;
    value: number;
  };
  products?: Pick<BaseProductType, 'id' | 'quantity'>[];
  surcharges?: number[]; // Danh sach id ph??? thu
  paymentType?: ShippingPaymentMethodType;
  debtPaymentMethod?: {
    method: string;
    account: string;
    name: string;
  };
  shipFeePaymentMethod?: {
    method: string;
    account: string;
    name: string;
  };
}

export interface CreateOrUpdateImportProductParams {
  provider: number; // ID nh?? cung c???p. Nh?? cung c???p l??? = -1
  products: ImportedProductType[];
  id?: number | undefined;
  newStatus?: ImportStatusType;
  payments?: Array<OrderPaymentParams>;
}

export interface ImportProductSettingParams {
  productId: number;
  productName: string;
  providerId: number;
  otherProducts: Array<any>;
  //session id
  importProductId: number | undefined;
  productPrice: number | undefined;
  isImportProduct: boolean;
}

export interface ImportProductSettingParams {
  productId: number;
  productName: string;
  providerId: number;
  otherProducts: Array<any>;
}

export interface FetchGetRefundListParams extends RequestParams {
  type: number; // -1 n???u l???y h???t
  startTimestamp?: number; // N???u mu???n l???y h???t th?? truy???n 1 -> now
  endTimestamp?: number;
  paymentStatus?: OrderPaymentStatusType;
  status?: ReturnStatusType;
}

export interface FetchCreateReturnProductParams {
  orderId?: number;
  products: Pick<BaseProductType, 'id' | 'quantity'>[];
  refundFee?: number;
  otherRefund?: number;
  payments: Array<OrderPaymentParams>;
  guestId?: number; // Kh??ch l??? truy???n -1
  // Tr??? kh??c
  discount?: number; // Gi???m gi?? ti???n m???t
  priceSetting?: number;
}

export interface FetchUpdateReturnProductParams {
  payments: Array<OrderPaymentParams>;
  id: number;
  products: Pick<BaseProductType, 'id' | 'quantity'>[];
}

export interface FetchGetImportedProducts extends RequestParams {
  startTimestamp?: number; // N???u mu???n l???y h???t th?? truy???n 1 -> now
  endTimestamp?: number;
}

export interface FetchGetReturnOrImportedGoods extends RequestParams {
  startTimestamp?: number; // N???u mu???n l???y h???t th?? truy???n 1 -> now
  endTimestamp?: number;
}

export interface PayBillParams extends OrderDetailsType {
  type: OrderType;
}

export interface FetchCalculateReturnProductTotalPriceParams {
  orderId?: number;
  products: Pick<BaseProductType, 'id' | 'quantity'>[];
  refundFee?: number; // Ph?? tr??? h??ng.
  otherRefund?: number; // S??? ti???n tr??? kh??c
  priceSetting?: number;
}

export interface FetchGetEmployeesParams extends RequestParams {}

export interface FetchGetSalaryListParams extends RequestParams {
  startTimestamp?: number;
  endTimestamp?: number;
}

export interface FetchResetPasswordParams {
  username: string;
  password: string;
  otp: string;
}

export interface ReturnProductCheckoutParams {
  paymentRequire: number;
  totalPrice: number;
  guestId?: number;
  priceSetting?: number;
  orderId?: number;
  products: Pick<BaseProductType, 'id' | 'quantity'>[];
}

export interface FetchCreateOrUpdateReceiptTypeParams {
  type: CashBookReceiptType;
  name?: string;
  description?: string;
  id?: number;
}
