export interface FetchGetRoleListResponse {
  success: true;
  data: RoleType[];
}

export interface RoleType {
  id: number;
  name: string;
}
