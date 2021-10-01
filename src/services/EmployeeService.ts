import HttpService from 'services/HttpService';
import {GetCurrentStore} from 'store/Me';
import {FetchGetEmployeesParams, FetchGetSalaryListParams} from 'types/Params';
import {
  CreateOrUpdateEmployeeFormValues,
  CreateOrUpdateSalaryFormValues,
} from 'types/Properties';
import {FetchGetEmployeeDetailsResponse} from 'types/Responses/FetchGetEmployeeDetailsResponse';
import {FetchGetEmployeesResponse} from 'types/Responses/FetchGetEmployeesResponse';
import {FetchGetRoleListResponse} from 'types/Responses/FetchGetRoleListResponse';
import {FetchGetSalaryDetailsResponse} from 'types/Responses/FetchGetSalaryDetailsResponse';
import {FetchGetSalaryListResponse} from 'types/Responses/FetchGetSalaryListResponse';

const fetchCreateOrUpdateEmployee = async (
  values: CreateOrUpdateEmployeeFormValues,
) => {
  const currentStore = GetCurrentStore();
  const {id, ...rest} = values;

  const body = {
    fullName: rest.name || '',
    phone: rest.phone || '',
    dob: rest.dob || 1,
    taxCode: rest.taxCode || '',
    address: rest.address || '',
    city: rest.city || '',
    district: rest.district || '',
    email: rest.email || '',
    facebook: rest.facebook || '',
    description: rest.description || '',
    roles: rest.roles || [],
  };

  if (id) {
    return await HttpService.Post(
      `/store/${currentStore?.id}/personnel/update`,
      body,
      {
        params: {id},
      },
    );
  }
  return await HttpService.Post(
    `/store/${currentStore?.id}/personnel/create`,
    body,
  );
};

const fetchGetEmployees = async (params: FetchGetEmployeesParams) => {
  const currentStore = GetCurrentStore();
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const body = {
    sort: {
      field: sortField,
      order: sortOrder,
    },
    context: params.keyword ?? '',
  };
  const {data, success} = await HttpService.Post<FetchGetEmployeesResponse>(
    `/store/${currentStore?.id}/personnel/list`,
    body,
  );

  return {
    success: success,
    data: {
      total: data?.length,
      totalPage: 1,
      list: data,
    },
  };
};

const fetchGetEmployeeDetails = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetEmployeeDetailsResponse>(
    `/store/${currentStore?.id}/personnel/read`,
    {
      params: {id},
    },
  );
};

const fetchDeleteEmployee = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/personnel/delete`, {
    params: {id},
  });
};

const fetchGetRoleList = () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetRoleListResponse>(
    `/store/${currentStore?.id}/role/list`,
  );
};

const fetchCreateOrUpdateSalary = async (
  values: CreateOrUpdateSalaryFormValues,
) => {
  const currentStore = GetCurrentStore();
  const {id} = values;

  const body = {
    personnelId: values.personnelId ?? 0,
    startTimestamp: values.startTimestamp ?? 1,
    endTimestamp: values.endTimestamp ?? 1,
    details: values.details ?? [],
    payments: values.payments ?? [],
  };

  if (id) {
    return await HttpService.Post(
      `/store/${currentStore?.id}/personnel/salary/update`,
      body,
      {
        params: {id},
      },
    );
  }
  return await HttpService.Post(
    `/store/${currentStore?.id}/personnel/salary/create`,
    body,
  );
};

const fetchGetSalaryList = async (params: FetchGetSalaryListParams) => {
  const currentStore = GetCurrentStore();
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const body = {
    startTimestamp: params?.startTimestamp ?? 1,
    endTimestamp:
      params?.endTimestamp === 1
        ? new Date().getTime() * 1000
        : params?.endTimestamp,
    sort: {
      field: sortField,
      order: sortOrder,
    },
    context: params.keyword ?? '',
  };
  const {data, success} = await HttpService.Post<FetchGetSalaryListResponse>(
    `/store/${currentStore?.id}/personnel/salary/list`,
    body,
  );

  return {
    success: success,
    data: {
      total: data.total,
      totalPage: 1,
      list: data.list,
    },
  };
};

const fetchGetSalaryDetails = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetSalaryDetailsResponse>(
    `/store/${currentStore?.id}/personnel/salary/read`,
    {
      params: {id},
    },
  );
};

const fetchDeleteSalary = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(
    `/store/${currentStore?.id}/personnel/salary/delete`,
    {
      params: {id},
    },
  );
};

export const EmployeeService = {
  fetchCreateOrUpdateEmployee,
  fetchGetEmployees,
  fetchGetEmployeeDetails,
  fetchDeleteEmployee,

  fetchGetRoleList,

  fetchCreateOrUpdateSalary,
  fetchGetSalaryList,
  fetchGetSalaryDetails,
  fetchDeleteSalary,
};
