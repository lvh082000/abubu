import {GetCurrentStore} from 'store/Me';
import {FetchCreateOrUpdateReceiptTypeParams} from 'types/Params';
import {CashBookReceiptType} from 'types/Properties';
import {
  FetchGetCashBookReceiptTypes,
  ReceiptDetailsType,
} from 'types/Responses/FetchGetCashBookReceiptTypes';
import HttpService from './HttpService';

const fetchGetCashBookMetaData = async () => {
  const promises = [
    fetchGetReceiptTypes(CashBookReceiptType.Input),
    fetchGetReceiptTypes(CashBookReceiptType.Output),
  ];
  const data = await Promise.all(promises);
  return data.reduce((result, current) => {
    return [...result, ...current];
  }, []);
};

const fetchCreateOrUpdateReceiptType = async (
  params: FetchCreateOrUpdateReceiptTypeParams,
) => {
  const currentStore = GetCurrentStore();
  const {id, type, ...rest} = params;
  let result: Record<string, any> = {};

  if (id) {
    const {data} = await HttpService.Post<{data: ReceiptDetailsType}>(
      `/store/${currentStore?.id}/meta-setting/update`,
      rest,
      {params: {id}},
    );
    result = {
      data: {
        ...data,
        type,
      },
    };
  } else {
    const {data} = await HttpService.Post<{data: ReceiptDetailsType}>(
      `/store/${currentStore?.id}/meta-setting/create`,
      rest,
      {
        params: {
          type:
            type === CashBookReceiptType.Input
              ? 'input_method'
              : 'output_method',
        },
      },
    );
    result = {
      data: {
        ...data,
        type,
      },
    };
  }

  return result as ReceiptDetailsType;
};

const fetchDeleteReceiptType = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/meta-setting/delete`, {
    params: {id},
  });
};

const fetchGetReceiptTypes = async (type: CashBookReceiptType) => {
  const currentStore = GetCurrentStore();
  return new Promise<ReceiptDetailsType[]>(async (resolve, reject) => {
    try {
      const {data} = await HttpService.Get<FetchGetCashBookReceiptTypes>(
        `/store/${currentStore?.id}/meta-setting/list`,
        {
          params: {
            type:
              type === CashBookReceiptType.Input
                ? 'input_method'
                : 'output_method',
          },
        },
      );
      const types = data.map(v => {
        return {
          ...v,
          type,
        };
      });
      resolve(types);
    } catch (error) {
      reject(error);
    }
  });
};
const getReceiptNameType = (type: CashBookReceiptType) => {
  if (type === CashBookReceiptType.Input) {
    return 'phiếu thu';
  }
  return 'phiếu chi';
};

export const CashBookService = {
  fetchCreateOrUpdateReceiptType,
  fetchDeleteReceiptType,
  fetchGetCashBookMetaData,
  fetchGetReceiptTypes,
  getReceiptNameType,
};
