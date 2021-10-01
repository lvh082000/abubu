import {createAsyncThunk} from '@reduxjs/toolkit';
import {CashBookService} from 'services/CashBookService';
import {FetchCreateOrUpdateReceiptTypeParams} from 'types/Params';

export const GetCashBookMetaDataPrefix = '@CashBook/GetCashBookMetaDataPrefix';

export const DeleteReceiptTypePrefix = '@CashBook/DeleteReceiptType';
export const CreateOrUpdateReceiptTypePrefix =
  '@CashBook/CreateOrUpdateReceiptTyp';

export const fetchGetCashBookMetaData = createAsyncThunk(
  GetCashBookMetaDataPrefix,
  async () => {
    return await CashBookService.fetchGetCashBookMetaData();
  },
);

export const fetchDeleteReceiptType = createAsyncThunk(
  DeleteReceiptTypePrefix,
  async (id: number) => {
    await CashBookService.fetchDeleteReceiptType(id);
    return id;
  },
);

export const fetchCreateOrUpdateReceiptType = createAsyncThunk(
  CreateOrUpdateReceiptTypePrefix,
  async (values: FetchCreateOrUpdateReceiptTypeParams) => {
    return await CashBookService.fetchCreateOrUpdateReceiptType(values);
  },
);
