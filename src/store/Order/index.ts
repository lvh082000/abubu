import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cloneDeep} from 'services/UtilService';
import {
  fetchGetOrderMetaData,
  fetchCreateOrUpdateOrtherRevenue,
  fetchCreateOrUpdatePaymentMethod,
  fetchDeleteOrtherRevenue,
  fetchCreateOrUpdateRoom,
  fetchDeleteRoom,
} from './ThunkActions';
import {OtherRevenueType, BankAccountItem} from 'types/Properties';
import {FetchCreateOrUpdateOtherRevenueResponse} from 'types/Responses/FetchCreateOrUpdateOtherRevenueResponse';
import {FetchCreateOrUpdatePaymentMethodResponse} from 'types/Responses/FetchCreateOrUpdatePaymentMethodResponse';

interface OrderStore {
  otherRevenues: Array<OtherRevenueType>;
  isMetaDataLoaded: boolean;
  bankAccounts: Array<BankAccountItem>;
  rooms: Array<{id: number; name: string}>;
}

const initialState: OrderStore = {
  bankAccounts: [],
  otherRevenues: [],
  rooms: [],
  isMetaDataLoaded: false,
};

const OrderSlice = createSlice({
  name: 'ORDER_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGetOrderMetaData.fulfilled, (state, action) => {
      state.otherRevenues = action.payload[0].data;
      state.bankAccounts = action.payload[1];
      state.rooms = action.payload[2].data;
      state.isMetaDataLoaded = true;
    });

    builder.addCase(
      fetchCreateOrUpdateOrtherRevenue.fulfilled,
      (
        state,
        action: PayloadAction<FetchCreateOrUpdateOtherRevenueResponse>,
      ) => {
        const index = state.otherRevenues.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.otherRevenues);
          data[index] = action.payload.data;
          state.otherRevenues = data;
        } else {
          state.otherRevenues = [...state.otherRevenues, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeleteOrtherRevenue.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.otherRevenues = state.otherRevenues.filter(
          v => v.id !== action.payload,
        );
      },
    );
    // CRUD payment-method
    builder.addCase(
      fetchCreateOrUpdatePaymentMethod.fulfilled,
      (
        state,
        action: PayloadAction<FetchCreateOrUpdatePaymentMethodResponse>,
      ) => {
        const index = state.bankAccounts.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.bankAccounts);
          data[index] = action.payload.data;
          state.bankAccounts = data;
        } else {
          state.bankAccounts = [...state.bankAccounts, action.payload.data];
        }
      },
    );
    // CRUD room
    builder.addCase(
      fetchCreateOrUpdateRoom.fulfilled,
      (state, action: PayloadAction<any>) => {
        const index = state.rooms.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.rooms);
          data[index] = action.payload.data;
          state.rooms = data;
        } else {
          state.rooms = [...state.rooms, action.payload.data];
        }
      },
    );

    builder.addCase(
      fetchDeleteRoom.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.rooms = state.rooms.filter(v => v.id !== action.payload);
      },
    );
  },
});

export default OrderSlice.reducer;

export * from './Selectors';

export * from './ThunkActions';
