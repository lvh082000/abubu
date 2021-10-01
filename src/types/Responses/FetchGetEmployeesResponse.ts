import {BaseEmployeeType} from 'types/Properties';

export interface FetchGetEmployeesResponse {
  success: true;
  data: Array<EmployeeType>;
}

export interface EmployeeType extends BaseEmployeeType {
  code: string;
  phone: string;
}
