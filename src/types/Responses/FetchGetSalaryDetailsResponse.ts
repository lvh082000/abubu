import {SalarySettingType, Payment} from 'types/Properties';

export interface FetchGetSalaryDetailsResponse {
  success: true;
  data: SalaryDetailsType;
}

export interface SalaryDetailsType {
  id: number;
  storeId: number;
  userId: number;
  startTimestamp: number;
  endTimestamp: number;
  personnelName: string;
  personnelPhone: string;
  personnelCode: string;
  title: string;
  paymentRequire: number;
  paid: number;
  paymentStatus: number;
  createdAt: number;
  updateAt: number;
  detais: SalarySettingType[];
  payments: Payment[];
}
