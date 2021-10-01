import {createAsyncThunk} from '@reduxjs/toolkit';
import {OrderService} from 'services/OrderService';
import {
  CreateOrUpdateOtherRevenueFormValues,
  CreateOrUpdatePaymentMethodFormValues,
  CreateOrUpdateRoomValues,
} from 'types/Properties';

export const GetOrderMetaDataPrefix = '@Order/GetOrderMetaDataPrefix';

export const GetOrtherRevenuesPrefix = '@Order/GetOrtherRevenues';
export const DeleteOtherRevenuePrefix = '@Order/DeleteCategory';
export const CreateOrUpdateOtherRevenuePrefix = '@Order/CreateOrUpdateCategory';

export const GetRoomsPrefix = '@Order/GetRooms';
export const DeleteRoomPrefix = '@Order/DeleteRoom';
export const CreateOrUpdateRoomPrefix = '@Order/CreateOrUpdateRoom';

export const CreateOrUpdateShipperPrefix = '@Order/CreateOrUpdateShipper';

export const GetBankAccountsPrefix = '@Order/GetBankAccounts';
export const CreateOrUpdatePaymentMethodPrefix =
  '@Order/CreateOrUpdatePaymentMethod';

export const fetchGetOrderMetaData = createAsyncThunk(
  GetOrderMetaDataPrefix,
  async () => {
    return await OrderService.fetchGetOrderMetaData();
  },
);

export const fetchGetOrtherRevenues = createAsyncThunk(
  GetOrtherRevenuesPrefix,
  async () => {
    return await OrderService.fetchGetOrtherRevenues();
  },
);

export const fetchDeleteOrtherRevenue = createAsyncThunk(
  DeleteOtherRevenuePrefix,
  async (id: number) => {
    await OrderService.fetchDeleteOrtherRevenue(id);
    return id;
  },
);

export const fetchCreateOrUpdateOrtherRevenue = createAsyncThunk(
  CreateOrUpdateOtherRevenuePrefix,
  async (values: CreateOrUpdateOtherRevenueFormValues) => {
    return await OrderService.fetchCreateOrUpdateOrtherRevenue(values);
  },
);

export const fetchGetBankAccounts = createAsyncThunk(
  GetBankAccountsPrefix,
  async () => {
    return await OrderService.fetchGetBankAccounts();
  },
);

export const fetchCreateOrUpdatePaymentMethod = createAsyncThunk(
  CreateOrUpdatePaymentMethodPrefix,
  async (values: CreateOrUpdatePaymentMethodFormValues) => {
    return await OrderService.fetchCreateOrUpdatePaymentMethod(values);
  },
);

export const fetchGetRooms = createAsyncThunk(GetRoomsPrefix, async () => {
  return await OrderService.fetchGetRooms();
});

export const fetchDeleteRoom = createAsyncThunk(
  DeleteRoomPrefix,
  async (id: number) => {
    await OrderService.fetchDeleteRoom(id);
    return id;
  },
);

export const fetchCreateOrUpdateRoom = createAsyncThunk(
  CreateOrUpdateRoomPrefix,
  async (values: CreateOrUpdateRoomValues) => {
    return await OrderService.fetchCreateOrUpdateRoom(values);
  },
);
