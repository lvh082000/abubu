export interface FetchGetProductsResponse {
  success: boolean;
  data: {
    total: number;
    totalPage: number;
    list: ProductItemType[];
  };
}

export interface ProductItemType {
  id: number;
  sellPrice: number;
  avability: 0 | 1;
  name: string;
  price: number;
  quantity: number;
  createdAt: number;
  avatar: string;
  barcode: string;
  costPrice: number;
}
