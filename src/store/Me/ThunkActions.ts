import {createAsyncThunk} from '@reduxjs/toolkit';
import {ProfileService} from 'services/ProfileService';
import {ShopService} from 'services/ShopService';
import {
  ProfileSettingFormValues,
  ShopSettingFormValues,
} from 'types/Properties';

export const GetProfilePrefix = '@Me/GetProfile';
export const UpdateProfilePrefix = '@Me/UpdateProfile';
export const GetCurrentStorePrefix = '@Me/GetCurrentStore';
export const CreateOrUpdateStorePrefix = '@Me/CreateOrUpdateStore';

export const fetchGetProfile = createAsyncThunk(GetProfilePrefix, async () => {
  return await ProfileService.fetchGetProfile();
});

export const fetchUpdateProfile = createAsyncThunk(
  UpdateProfilePrefix,
  async (values: ProfileSettingFormValues) => {
    return await ProfileService.fetchUpdateProfile(values);
  },
);

export const fetchGetCurrentStore = createAsyncThunk(
  GetCurrentStorePrefix,
  async (id: number) => {
    return await ShopService.fetchGetShop(id);
  },
);

export const fetchCreateOrUpdateStore = createAsyncThunk(
  CreateOrUpdateStorePrefix,
  async (values: ShopSettingFormValues) => {
    return await ShopService.fetchCreateOrUpdateShop(values);
  },
);
