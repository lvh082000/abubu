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
  type: OrderType; // 0: Đơn trực tiếp, 1: Đơn ship cod, 2: Đơn bàn phòng
  guestId: number; // -1: Khách lẻ (truyền mặc định nếu là khách lẻ). Khách quen truyền id (làm sau).
  priceSetting: -1; // ID của bảng giá (price-setting)
  address: string;
  locationId: number; // Truyền id của location với filter là bàn phòng khi lấy danh sách location
  discount: {
    type: string; // Kiểu giảm [percent,cash]
    value: number; // Giá trị giảm. percent [0-100], cash: số lượng tùy ý
  };
  products: Array<{
    id: number; // Id của product.
    quantity: number; // Số lượng
  }>;
  payments: Array<{
    method: PaymentMethodType; // Phương thức thanh toán [cash,bank,card]
    receive: number; // Số tiền nhận
    return: number; // Số tiền đã trả lại
  }>;
  surcharges: number[]; // ID các khoản phụ thu (lấy từ API list).
}

export interface FetchGetPartnersParams extends RequestParams {
  type: PartnerType;
  startTimestamp?: number; // Nếu muốn lấy hết thì truyền 1 -> now
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
  return: number; // Tự nhập vào tính dựa trên số tiền cần trả - số đã trả. Nếu không thì nhập tay.
  name: string | null; // Tên tk ngân hàng... không có thì truyền null
  account: string | null; // Số tk ngân hàng, không có truyền null
  isNew: true; // Những thanh toán mới nhập luôn truyền field này = true, tránh nhầm lẫn vs những thanh toán đã có trước đó.
}

export interface CreateOrderParams extends CalculateTotalOrderPriceParams {
  type: OrderType; // Type=0: Đơn hàng trực tiếp.
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
  startTimestamp?: number; // Nếu muốn lấy hết thì truyền 1 -> now
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
  surcharges?: number[]; // Danh sach id phụ thu
  priceSetting?: number; // ID bảng giá
}

export interface FetchUpdateShippingPaymentOrderParams {
  id: number;
  payments: Array<OrderPaymentParams>;
  newStatus: number; // Tại điểm này nếu chưa chốt thông tin thì truyền = null. Nếu đã chốt thì truyền = 1
  priceSetting?: number; // ID bảng giá
  codFee?: number; // Phí cod shop thu
  shipInfo?: {
    shipperId: number; // Lấy partner id type = shipper. Chưa có thì để -1 qua bước tiếp theo cập nhật sau
    fee: number; // Phí trả cho shipper: Để mặc định là 0 nếu chưa có.
    shipperPhone: string; // Số điện thoại shipper lấy từ partner. Chưa có để null hoặc rỗng
    shipperName: string; // Như trên
    weight: number; // Trọng lượng gói hàng (gram).
    codAmount: number; // Số tiên ứng trước của shipper: Là số tiền khách cần trả - phí ship. Ví dụ khách cần trả (paymentRequire) 105.000đ, phí ship 5000đ. Thì tiền thu hộ sẽ là 100.000.
  };
  discount?: {
    type: string;
    value: number;
  };
  products?: Pick<BaseProductType, 'id' | 'quantity'>[];
  surcharges?: number[]; // Danh sach id phụ thu
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
  provider: number; // ID nhà cung cấp. Nhà cung cấp lẻ = -1
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
  type: number; // -1 nếu lấy hết
  startTimestamp?: number; // Nếu muốn lấy hết thì truyền 1 -> now
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
  guestId?: number; // Khách lẻ truyền -1
  // Trả khác
  discount?: number; // Giảm giá tiền mặt
  priceSetting?: number;
}

export interface FetchUpdateReturnProductParams {
  payments: Array<OrderPaymentParams>;
  id: number;
  products: Pick<BaseProductType, 'id' | 'quantity'>[];
}

export interface FetchGetImportedProducts extends RequestParams {
  startTimestamp?: number; // Nếu muốn lấy hết thì truyền 1 -> now
  endTimestamp?: number;
}

export interface FetchGetReturnOrImportedGoods extends RequestParams {
  startTimestamp?: number; // Nếu muốn lấy hết thì truyền 1 -> now
  endTimestamp?: number;
}

export interface PayBillParams extends OrderDetailsType {
  type: OrderType;
}

export interface FetchCalculateReturnProductTotalPriceParams {
  orderId?: number;
  products: Pick<BaseProductType, 'id' | 'quantity'>[];
  refundFee?: number; // Phí trả hàng.
  otherRefund?: number; // Số tiền trả khác
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
