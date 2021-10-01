export interface FetchGetPersonResponseType {
  total: number;
  totalPage: number;
  list: PersonItemType[];
}

export interface PersonItemType {
  code: string;
  phone: string;
  avatar?: string;
  name: string;
  fullName: string;
  id: number;
}
