import {ProductPropertyType, UploadedFileParams} from 'types/Params';
import {ProductDetailsType} from 'types/Responses/FetchReadProductResponse';

export type PaymentMethodType = 'cash' | 'bank' | 'card' | 'paidlater' | 'cod';

export type PartnerType = 'guest' | 'provider' | 'shipper';

export type UOMType = 'cash' | 'percent';

export type BaseProductType = {
  id: number;
  name: string;
  price?: number;
  quantity: number;
  barcode: string;
};

export type BaseEmployeeType = {
  id: number;
  fullName: string;
};

export type BasePartnerType = {
  id: number;
  name: string;
  type: PartnerType;
};

export enum OrderType {
  //0: Đơn trực tiếp, 1: Đơn ship cod, 2: Đơn bàn phòng
  TakeAway = 0,
  Shipping = 1,
  BookByRoom = 2,
  Return = 3,
  Import = 4,
  ReturnOrImported = 5,
}

export interface LoginFormValues {
  emailOrPhone: string;
  password: string;
  isRemmember: boolean;
}

export interface RegisterFormValues {
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface BasicInformationFormValues {
  name: string;
  phone: string;
  city: string;
  district: string;
  taxCode?: string;
  address?: string;
  email?: string;
  facebook?: string;
  description?: string;
  uploadedAvatar?: UploadedFileParams;
  avatar?: string;
}

export interface CreateOrUpdateProductFormValues {
  barcode?: string;
  name: string;
  sellPrice: string;
  costPrice: string;
  quantity: string;
  weight?: string;
  groupId?: string;
  brandId?: string;
  description?: string;
  showOnWeb?: boolean;
  goodSale?: boolean;
  isNew?: boolean;
  promotion?: boolean;
  abubuPrice?: string;
  properties?: ProductPropertyType[];
  locationId?: string;
  avability?: boolean;
  images?: Array<string>;
  uploadedImages: Array<UploadedFileParams>;
  id?: number | undefined;
  removedImages: Array<string>;
}

export interface CreateOrUpdatePriceFormValues {
  id?: number | undefined;
  name: string;
  type: 0 | 1;
  value: string;
  uom: UOMType;
}

export interface ProfileSettingFormValues {
  email: string;
  phone: string;
  fullName: string;
  avatar: string;
  uploadedAvatar?: UploadedFileParams | undefined;
  // firebaseToken: string;
  // dob: number;
  // setting: ProfileSettingType;
}

export interface ShopSettingFormValues {
  name: string;
  address: string;
  avatar: string;
  uploadedAvatar?: UploadedFileParams | undefined;
}

export interface ProductIntentoryItem
  extends Pick<ProductDetailsType, 'name' | 'id' | 'quantity' | 'barcode'> {
  actual: number;
}

export interface SelectedProductType extends BaseProductType {
  inStock?: number;
  price: number;
  costPrice?: number;
}

export interface OtherRevenueType {
  id?: number | undefined;
  name: string;
  value: number;
  uom: UOMType;
  amount?: number;
}

export interface CreateOrUpdateOtherRevenueFormValues
  extends OtherRevenueType {}

export interface CreateOrUpdatePartnerFormValues
  extends BasicInformationFormValues {
  type: PartnerType;
  avatar?: string;
  id?: number | undefined;
  uploadedAvatar?: UploadedFileParams;
}

export interface CreateOrUpdateEmployeeFormValues
  extends BasicInformationFormValues {
  id?: number | undefined;
  dob?: number;
  roles?: number[];
}

export interface SalarySettingType {
  id?: number;
  name: string;
  value: number;
}

export interface Payment {
  method: string;
  account: string;
  name: string;
  receive: number;
  isNew: true;
}

export interface CreateOrUpdateSalaryFormValues {
  id?: number | undefined;
  personnelId?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  details?: SalarySettingType[];
  payments?: PartnerType[];
}

export interface BankAccountItem {
  id?: number | undefined;
  type?: string;
  account: string;
  name: string;
  bank: string;
}

export interface CreateOrUpdatePaymentMethodFormValues
  extends BankAccountItem {}

export interface TakeAwayCheckoutFormValues {
  shipping: string;
  otherRevenues: Array<number>;
  uom: UOMType;
  value: string;
  paymentMethod: string;
  paid: string;
  totalPaid: string;
}

export interface BookByRoomCheckoutFormValues {
  uom: UOMType;
  value: string;
  paymentMethod: string;
  paid: string;
  otherRevenues: Array<number>;
}

export interface ShippingCheckoutFormValues {
  otherRevenues: [];
  uom: UOMType;
  value: string;
  codFee: string;
}

export type OrderDiscountType = {
  type: UOMType;
  value: number;
};

export interface ShippingDeliveryFormValues {
  address: string;
  weight: string;
  paidShipper: string;
  shipper: string;
  paidCod: string;
}

export enum TakeAwayOrderStatusType {
  Success = 3,
  Cancel = 4,
}

export enum ShippingOrderStatusType {
  // 0: Đơn chờ đóng gói.
  // 1: Đơn đã đóng gói chờ xuất kho.
  // 2: Đơn đã xuất kho đang vận chuyển.
  // 3: Đơn đã hoàn tất.
  // 4: Đơn đã bị hủy.
  // -1: Chờ xử lý thanh toán
  Packing = 0,
  Exporting = 1,
  Delivering = 2,
  Success = 3,
  Cancel = 4,
  Paying = -1,
}

export enum BookByRoomOrderStatusType {
  Processing = 0,
  Success = 3,
  Cancel = 4,
}

export type TotalCheckoutType = {
  totalAmount: number;
  paymentRequire: number;
  totalProductAmount: number;
  totalSurcharge: number;
};

export enum OrderPaymentStatusType {
  //-1: All, 0: Chưa thanh toán, 1: Đã thanh toán 1 phần, 2: Xong
  All = -1,
  UnPay = 0,
  Paid = 1,
  Done = 2,
}

export enum ShippingPaymentMethodType {
  Cod = 1,
  PaidLater = 2,
  Others = 3,
}

export interface CreateOrUpdateRoomValues {
  table: string;
  floor: string;
  id?: number;
  room: string;
}

export interface ImportProductSettingFormValues {
  quantity: number;
  description: string;
  unitPrice: string;
  uom: UOMType;
  value: string;
}

export interface ImportedProductType
  extends Omit<BaseProductType, 'barcode' | 'name'> {
  price: number; // Giá nhập
  discount: number; // Giảm giá. Mặc định để 0
  discountType: UOMType; // cash | percent
  description: string; // Mô tả
}

export enum ReturnStatusType {
  Processing = 0,
  Done = 1,
  Cancel = 2,
}

export enum ImportStatusType {
  //+ 0: Đơn nháp: Cho phép thêm payments, sửa chi tiết danh sách sản phẩm.
  // + 1: Đơn hoàn thành: Chỉ cho thêm payments.
  // + 2: Đơn đã bị hủy: Đơn hủy đi kèm với việc đã hủy toàn bộ bút toán tài chính.
  Processing = 0,
  Done = 1,
  Cancel = 2,
}

export enum OrderStatusType {
  //3: Hoàn thành, 4: Đã hủy
  Done = 3,
  Cancel = 4,
}

export enum ProductPropType {
  Category = 'Category',
  Brand = 'Brand',
  Location = 'Location',
  Property = 'Property',
}

export enum UpdatePaymentType {
  UpdatePaymentCOD = 'UpdatePaymentCOD',
  AddPaymentOrder = 'AddPaymentOrder',
}

export enum PermissionType {
  ProductRO = 'product_ro',
  ProductRW = 'product_rw',
  TransactionRO = 'transaction_ro',
  TransactionRW = 'transaction_rw',
  PartnerRO = 'partner_ro',
  PartnerRW = 'partner_rw',
  PersonnelRO = 'personnel_ro',
  PersonnelRW = 'personnel_rw',
  CashbookRO = 'cashbook_ro',
  CashbookRW = 'cashbook_rw',
  ReportRO = 'report_ro',
  ReportRW = 'report_rw',
}

export enum CashBookType {
  Cash = 'Cash',
  Bank = 'Bank',
}

export enum CashBookReceiptType {
  Input = 'Input',
  Output = 'Output',
}

export interface CreateOrUpdateReceiptTypeFormValues {
  name: string;
  description?: string;
}

export interface CreateOrUpdateCashBookFormFormValues {
  outputType?: string; // Loại thu
  receiverId?: string; // ID người nhận tiền: Id khách hàng, đối tác...
  receiverName?: string; // Tên người nhận. Cho nhập tay hoặc chọn từ danh sách
  receiverGroup?: string; // personnel, guest, provider, other...
  inputType?: string; // Loại thu
  payerId?: string; // ID người nộp tiền: Id khách hàng, đối tác...
  payerName?: string; // Tên người nộp. Cho nhập tay hoặc chọn từ danh sách
  payerGroup?: string; // personnel, guest, provider, other...
  method: string; // bank, cash
  amount: string; // Số tiền thu > 0
  name: string; // Tên ngân hàng, nếu là tiền mặt thì đê null
  account: string; // Tài khoản, nếu là tiền mặt thì đê null
  description: string;
  transactionDate: number; // Thời gian thực hiện phiếu thu. Có thể trong quá khứ hoặc hiện tại
}

export enum SelectSharedItemType {
  Category = 'Category',
  Brand = 'Brand',
  Location = 'Location',
  Property = 'Property',
  InputReceipt = 'InputReceipt',
  OutputReceipt = 'InputReceipt',
}

export enum SelectSharedPersonType {
  Provider = 'Provider',
  Employee = 'Employee',
  Customer = 'Customer',
}

export enum CashBookGroupType {
  //personnel, guest, provider, other
  Personnel = 'personnel',
  Guest = 'guest',
  Provider = 'provider',
  Other = 'other',
}
