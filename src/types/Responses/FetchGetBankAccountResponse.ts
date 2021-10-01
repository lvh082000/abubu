export interface FetchGetBankAccountsResponse {
  success: boolean;
  data: Array<BankAccountType>;
}

export interface BankAccountType {
  id: number;
  name: string;
  bank: string;
  account: string;
  type: 'card' | 'bank';
}
