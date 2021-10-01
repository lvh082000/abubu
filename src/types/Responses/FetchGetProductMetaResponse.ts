export interface FetchGetProductMetaResponse {
  success: boolean;
  data: ProductMetaType[];
}

export interface ProductMetaType {
  id: number;
  name: string;
}
