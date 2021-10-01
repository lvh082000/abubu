export interface FetchCreateOrUpdateProductMetaResponse {
  success: boolean;
  data: ProductMetaType;
}

interface ProductMetaType {
  id: number;
  name: string;
}
