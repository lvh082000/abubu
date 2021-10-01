export interface FetchGetProfileResponse {
  success: boolean;
  data: ProfileType;
}

export interface ProfileType {
  id: number;
  email: string;
  phone: any;
  fullName: any;
  lock: number;
  premiumDate: any;
  avatar: string;
  firebaseToken: string;
  dob: any;
  invalidCount: number;
  createdAt: number;
  updateAt: number;
  setting: ProfileSettingType;
  stores: StoreType[];
}

export interface ProfileSettingType {
  transaction: boolean;
  product: boolean;
  cash_book: boolean;
  guest: boolean;
}

export interface StoreType {
  id: number;
  owner: boolean;
  name: string;
  roles: number[];
  permissions: string[];
}
