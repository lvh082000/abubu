import HttpService from 'services/HttpService';
import {GetCurrentStore} from 'store/Me';
import {FetchCreateOrUpdateShopParams} from 'types/Params';
import {ShopSettingFormValues} from 'types/Properties';
import {FetchGetShopResponse} from 'types/Responses/FetchGetShopResponse';
import {FileService} from 'services/FileService';

const fetchCreateOrUpdateShop = async (values: ShopSettingFormValues) => {
  const currentStore = GetCurrentStore();
  const {uploadedAvatar, ...rest} = values;
  const data: FetchCreateOrUpdateShopParams = {
    ...rest,
    avatar: '',
  };

  if (uploadedAvatar) {
    data.avatar = await FileService.uploadFile(uploadedAvatar);
  }
  if (values.avatar) {
    FileService.fetchRemoveFile(values.avatar);
  }

  if (currentStore && currentStore.id) {
    return await HttpService.Post<FetchGetShopResponse>(
      `/store/${currentStore.id}/update`,
      data,
    );
  }
  return await HttpService.Post<FetchGetShopResponse>('/me/store/create', data);
};

const fetchGetShop = async (id: number) => {
  return await HttpService.Get<FetchGetShopResponse>(`/store/${id}`);
};

export const ShopService = {
  fetchCreateOrUpdateShop,
  fetchGetShop,
};
