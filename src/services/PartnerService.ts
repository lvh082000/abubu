import HttpService from 'services/HttpService';
import {GetCurrentStore} from 'store/Me';
import {FetchGetPartnersParams} from 'types/Params';
import {CreateOrUpdatePartnerFormValues, PartnerType} from 'types/Properties';
import {FileService} from 'services/FileService';
import {FetchGetPartnersResponse} from 'types/Responses/FetchGetPartnersResponse';
import {FetchGetPartnerDetailsResponse} from 'types/Responses/FetchGetPartnerDetailsResponse';

const fetchCreateOrUpdatePartner = async (
  values: CreateOrUpdatePartnerFormValues,
) => {
  const currentStore = GetCurrentStore();
  const {id, uploadedAvatar, ...rest} = values;

  const body = {
    ...rest,
    email: rest.email || null,
    taxCode: rest.taxCode || null,
    address: rest.address || null,
    city: rest.city || null,
    avatar: rest.avatar || null,
    district: rest.district || null,
    facebook: rest.facebook || null,
    description: rest.description || null,
  };

  if (uploadedAvatar) {
    if (values.avatar) {
      FileService.fetchRemoveFile(values.avatar);
    }
    body.avatar = await FileService.uploadFile(uploadedAvatar);
  }

  if (id) {
    return await HttpService.Post(
      `/store/${currentStore?.id}/partner/update`,
      body,
      {
        params: {id},
      },
    );
  }
  return await HttpService.Post(
    `/store/${currentStore?.id}/partner/create`,
    body,
  );
};

const fetchGetPartners = async (params: FetchGetPartnersParams) => {
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const currentStore = GetCurrentStore();
  const body = {
    startTimestamp: params?.startTimestamp ?? 1, // Nếu muốn lấy hết thì truyền 1 -> now
    endTimestamp:
      params?.endTimestamp === 1
        ? new Date().getTime() * 1000
        : params?.endTimestamp,
    currentPage: params.page,
    pageSize: params.limit,
    sort: {
      field: sortField,
      order: sortOrder,
    },
    context: params.keyword ?? '',
    type: params.type,
    getAll: true,
    getTrans: true,
  };

  return await HttpService.Post<FetchGetPartnersResponse>(
    `/store/${currentStore?.id}/partner/list`,
    body,
  );
};

const fetchGetPartner = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetPartnerDetailsResponse>(
    `/store/${currentStore?.id}/partner/read`,
    {
      params: {id},
    },
  );
};

const fetchDeletePartner = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/partner/delete`, {
    params: {id},
  });
};

const getTitleByType = (type: PartnerType) => {
  switch (type) {
    case 'guest':
      return 'khách hàng';
    case 'provider':
      return 'nhà cung cấp';
  }
};

export const PartnerService = {
  fetchGetPartners,
  fetchCreateOrUpdatePartner,
  fetchGetPartner,
  getTitleByType,
  fetchDeletePartner,
};
