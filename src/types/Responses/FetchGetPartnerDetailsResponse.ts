import {BasePartnerType} from 'types/Properties';

export interface FetchGetPartnerDetailsResponse {
  success: boolean;
  data: PartnerDetailsType;
}

export interface PartnerDetailsType extends BasePartnerType {
  storeId: number;
  phone: string;
  code: string;
  dob: number;
  taxCode: any;
  address: string;
  city: string;
  district: string;
  email: any;
  avatar: any;
  facebook: any;
  description: any;
  totalDebt: number;
  debit: number;
  totalTrans: number;
  createdAt: number;
  updateAt: number;
  db_date: string;
  totalDebit: number;
  totalRefund: number;
  transDetails: TransDetailType[];
  debtDetails: DebtDetailType[];
}

export interface TransDetailType {
  id: number;
  status: number;
  code: string;
  paymentRequire: number;
  paymentStatus: number;
  locationName?: string;
  paid: number;
  createdAt: number;
  type?: string;
}

export interface DebtDetailType {
  id: number;
  type: string;
  createdAt: number;
  code: string;
  paymentRequire: number;
  paid: number;
  lack: number;
}
