import {UOMType} from 'types/Properties';

export interface FetchGetPriceResponse {
  success: boolean;
  data: Array<PriceType>;
}

export interface PriceType {
  id: number;
  storeId?: number;
  name: string;
  type: 0 | 1;
  value: number;
  uom: UOMType;
  createdAt?: number;
  updateAt?: number;
  db_date?: string;
}
