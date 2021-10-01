import {OrderDetailsType} from './FetchGetOrderDetailsResponse';

export interface FetchCreateOrUpdateOrderResponse {
  data: CreateOrUpdateOrderType;
  success: boolean;
}

export interface CreateOrUpdateOrderType extends OrderDetailsType {

}
