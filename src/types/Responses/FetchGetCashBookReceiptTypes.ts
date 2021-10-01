import {CashBookReceiptType} from 'types/Properties';

export interface FetchGetCashBookReceiptTypes {
  success: boolean;
  data: ReceiptDetailsType[];
}

export interface ReceiptDetailsType {
  id: number;
  name: string;
  description: string;
  type: CashBookReceiptType;
}
