export interface FetchGetSalaryListResponse {
  success: true;
  data: Data;
}

export interface Data {
  total: number;
  list: SalaryItemType[];
}

export interface SalaryItemType {
  id: number;
  personnelName: string;
  personnelCode: string;
  personnelPhone: string;
  paymentRequire: number;
  title: string;
}
