import {BasePartnerType} from 'types/Properties';

export interface FetchGetPartnersResponse {
  success: boolean;
  data: Data;
}

interface Data {
  total: number;
  totalPage: number;
  list: PartnerItemType[];
}

export interface PartnerItemType extends BasePartnerType {
  code: string;
  phone: string;
  email: any;
  avatar: string;
  totalTrans: number;
  totalDebt: number;
}
