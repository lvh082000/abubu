import {BaseProductType, UOMType} from 'types/Properties';

export interface FetchGetImportProductDetailsResponse {
  success: boolean;
  data: ImportProductDetailsType;
}

interface ImportProductType extends BaseProductType {
  price: number;
  discount: number;
  discountType: UOMType;
  description: string;
}

export interface ImportProductDetailsType {
  id: number;
  storeId: number;
  code: string;
  type: string;
  provider: number;
  providerName: string;
  providerPhone: string;
  discount: number;
  discountType: string;
  actorId: number;
  actorName: string;
  status: number;
  paid: number;
  totalAmount: number;
  paymentRequire: number;
  paymentStatus: number;
  createdAt: number;
  updateAt: number;
  db_date: string;
  products: ImportProductType[];
  payments: any[];
  totalQuantity: number;
}
