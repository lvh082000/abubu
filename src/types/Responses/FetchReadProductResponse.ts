import {BaseProductType} from 'types/Properties';

export interface FetchReadProductResponse {
  success: boolean;
  data: ProductDetailsType;
}

export interface ProductDetailsType extends BaseProductType {
  storeId: number;
  type: string;
  brandId: number;
  branch: number;
  groupId: number;
  code: string;
  avatar: string;
  description: string;
  costPrice: number;
  sellPrice: number;
  weight: number;
  abubuPrice: number;
  showOnWeb: boolean;
  goodSale: boolean;
  promotion: boolean;
  isNew: boolean;
  avability: boolean;
  createdAt: number;
  updateAt: number;
  db_date: string;
  price: number;
  properties: Array<Property>;
  images: Array<string>;
  locationId: number;
}

interface Property {
  id: number;
  propId: number;
  name: string;
  attribute: string;
  variable: number;
  uom: string;
}
