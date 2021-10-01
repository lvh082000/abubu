import {FileService} from 'services/FileService';
import HttpService from 'services/HttpService';
import {FetchUpdateProfileParams} from 'types/Params';
import {ProfileSettingFormValues} from 'types/Properties';
import {FetchGetProfileResponse} from 'types/Responses/FetchGetProfileResponse';
import {GetCurrentStore, GetProfile} from 'store/Me';

const fetchGetProfile = async () => {
  return await HttpService.Get<FetchGetProfileResponse>('/me/profile');
};

const fetchUpdateProfile = async (values: ProfileSettingFormValues) => {
  const {uploadedAvatar, ...rest} = values;
  const data: FetchUpdateProfileParams = {
    ...rest,
    avatar: '',
  };

  if (uploadedAvatar) {
    data.avatar = await FileService.uploadFile(uploadedAvatar);
  }

  if (values.avatar) {
    FileService.fetchRemoveFile(values.avatar);
  }

  await HttpService.Post<{success: boolean; message: string}>(
    `/me/profile`,
    data,
  );

  return await HttpService.Get<FetchGetProfileResponse>('/me/profile');
};

const canIDo = (permisson: string | string[]) => {
  const store = GetCurrentStore();
  const profile = GetProfile();
  if (!store || !profile) {
    return false;
  }
  const current = profile.stores.find(v => v.id === store.id);
  if (!current || current?.permissions.length === 0) {
    return false;
  }
  if (typeof permisson === 'string') {
    return current.permissions.includes(permisson);
  }
  return permisson.every(v => current.permissions.includes(v));
};

export const ProfileService = {
  fetchGetProfile,
  fetchUpdateProfile,

  canIDo,
};
