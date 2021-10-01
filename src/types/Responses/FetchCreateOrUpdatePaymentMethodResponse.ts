import {BankAccountItem} from 'types/Properties';

export interface FetchCreateOrUpdatePaymentMethodResponse {
  success: boolean;
  data: BankAccountItem;
}
