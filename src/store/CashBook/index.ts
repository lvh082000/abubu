import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cloneDeep} from 'services/UtilService';
import {ReceiptDetailsType} from 'types/Responses/FetchGetCashBookReceiptTypes';
import {
  fetchCreateOrUpdateReceiptType,
  fetchDeleteReceiptType,
  fetchGetCashBookMetaData,
} from './ThunkActions';

interface CashBookStore {
  types: Array<ReceiptDetailsType>;
  isMetaDataLoaded: boolean;
}

const initialState: CashBookStore = {
  types: [],
  isMetaDataLoaded: false,
};

const CashBookSlice = createSlice({
  name: 'CASH_BOOK_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchGetCashBookMetaData.fulfilled,
      (state, action: PayloadAction<ReceiptDetailsType[]>) => {
        state.types = action.payload;
        state.isMetaDataLoaded = true;
      },
    );

    builder.addCase(
      fetchCreateOrUpdateReceiptType.fulfilled,
      (state, action: PayloadAction<any>) => {
        const index = state.types.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.types);
          data[index] = action.payload.data;
          state.types = data;
        } else {
          state.types = [...state.types, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeleteReceiptType.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.types = state.types.filter(v => v.id !== action.payload);
      },
    );
  },
});

export default CashBookSlice.reducer;

export * from './Selectors';

export * from './ThunkActions';
