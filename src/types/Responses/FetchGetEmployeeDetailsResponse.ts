import {BaseEmployeeType} from 'types/Properties';

export interface FetchGetEmployeeDetailsResponse {
  success: true;
  data: EmployeeDetailType;
}

export interface EmployeeDetailType extends BaseEmployeeType {
  storeId: number;
  userId: number;
  createdAt: number;
  updateAt: number;
  code: string;
  dob: number;
  taxCode: string;
  city: string;
  district: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  facebook: string;
  trans: TranType[];
  roles: [number];
}

export interface TranType {
  code: string;
  guestName: string;
  createdAt: number;
  paymentRequire: number;
  locationName: string;
  status: number;
}
