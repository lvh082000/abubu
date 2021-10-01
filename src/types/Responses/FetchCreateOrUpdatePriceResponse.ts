import {PriceUOM} from 'types/Properties';

export interface FetchCreateOrUpdatePriceResponse {
  success: boolean;
  data: PriceType;
}

interface PriceType {
  id: number;
  storeId?: number;
  name: string;
  type: 0 | 1;
  value: number;
  uom: PriceUOM;
  createdAt?: number;
  updateAt?: number;
  db_date?: string;
}
