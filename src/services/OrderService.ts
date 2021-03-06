import HttpService from 'services/HttpService';
import {GetCurrentStore} from 'store/Me';
import {GetBankAccounts} from 'store/Order';
import {
  CalculateTotalOrderPriceParams,
  CreateOrderParams,
  CreateOrUpdateImportProductParams,
  FetchCalculateReturnProductTotalPriceParams,
  FetchCreateReturnProductParams,
  FetchGetImportedProducts,
  FetchGetOrdersParams,
  FetchGetRefundListParams,
  FetchGetReturnOrImportedGoods,
  FetchUpdateBookByRoomPaymentOrderParams,
  FetchUpdateReturnProductParams,
  FetchUpdateShippingPaymentOrderParams,
  FetchUpdateTakeAwayPaymentOrderParams,
  OrderPaymentParams,
} from 'types/Params';
import {
  BankAccountItem,
  BookByRoomOrderStatusType,
  CreateOrUpdateOtherRevenueFormValues,
  CreateOrUpdatePaymentMethodFormValues,
  CreateOrUpdateRoomValues,
  ImportedProductType,
  ImportStatusType,
  OrderDiscountType,
  OrderType,
  PaymentMethodType,
  ReturnStatusType,
  ShippingDeliveryFormValues,
  UOMType,
} from 'types/Properties';
import {FetchCalculateImportProductTotalPrice} from 'types/Responses/FetchCalculateImportProductTotalPrice';
import {FetchCalculateOrderPriceResponse} from 'types/Responses/FetchCalculateOrderPriceResponse';
import {FetchCreateOrUpdateImportProductResponse} from 'types/Responses/FetchCreateOrUpdateImportProductResponse';
import {
  CreateOrUpdateOrderType,
  FetchCreateOrUpdateOrderResponse,
} from 'types/Responses/FetchCreateOrUpdateOrderResponse';
import {FetchCreateOrUpdateOtherRevenueResponse} from 'types/Responses/FetchCreateOrUpdateOtherRevenueResponse';
import {FetchCreateOrUpdatePaymentMethodResponse} from 'types/Responses/FetchCreateOrUpdatePaymentMethodResponse';
import {FetchGetBankAccountsResponse} from 'types/Responses/FetchGetBankAccountResponse';
import {FetchGetImportedProductResponse} from 'types/Responses/FetchGetImportedProductResponse';
import {FetchGetImportProductDetailsResponse} from 'types/Responses/FetchGetImportProductDetails';
import {FetchGetOrderDetailsResponse} from 'types/Responses/FetchGetOrderDetailsResponse';
import {FetchGetOrderedRoomResponse} from 'types/Responses/FetchGetOrderedRoomResponse';
import {FetchGetOrdersResponse} from 'types/Responses/FetchGetOrdersResponse';
import {FetchGetOtherRevenuesResponse} from 'types/Responses/FetchGetOtherRevenuesResponse';
import {PartnerItemType} from 'types/Responses/FetchGetPartnersResponse';
import {FetchGetProductMetaResponse} from 'types/Responses/FetchGetProductMetaResponse';
import {FetchGetRefundDetailsResponse} from 'types/Responses/FetchGetRefundDetailsResponse';
import {FetchGetRefundListResponse} from 'types/Responses/FetchGetRefundListResponse';
import {FetchGetReturnOrImportedGoodsResponse} from 'types/Responses/FetchGetReturnOrImportedGoodsResponse';
import {getBankAccountId, toNumberPrice, toStringPrice} from './UtilService';

const fetchGetTakeAwayOrders = async () => {};

const fetchGetShippingOrders = async () => {};

const fetchGetOrders = async (params: FetchGetOrdersParams) => {
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const currentStore = GetCurrentStore();

  const body = {
    startTimestamp: params?.startTimestamp ?? 1, // N???u mu???n l???y h???t th?? truy???n 1 -> now
    endTimestamp:
      params?.endTimestamp === 1
        ? new Date().getTime() * 1000
        : params?.endTimestamp,
    filter: {
      type: params.type, // -1 L???y h???t, 0: Tr???c ti???p, 1: COD, 2: B??n ph??ng.
      paymentStatus: params.paymentStatus ?? -1, // -1: All, 0: Ch??a thanh to??n, 1: ???? thanh to??n 1 ph???n, 2: Xong
      status: params.status ?? -1, // -1: All. 3: Ho??n th??nh, 4: ???? h???y
      context: params.keyword ?? '', // Text input
    },
    sort: {
      field: sortField,
      order: sortOrder,
    },
    pageSize: params.limit,
    currentPage: params.page,
  };

  if (params.type === OrderType.Shipping) {
    const promises = await Promise.all([
      HttpService.Post<FetchGetOrdersResponse>(
        `/store/${currentStore?.id}/order/list`,
        body,
      ),
      HttpService.Get<any>(`/store/${currentStore?.id}/order/pending_list`),
    ]);

    return {
      data: {
        ...promises[0].data,
        statusOrders: promises[1].data,
      },
    };
  }

  return HttpService.Post<FetchGetOrdersResponse>(
    `/store/${currentStore?.id}/order/list`,
    body,
  );
};

const fetchGetOrderMetaData = async () => {
  return await Promise.all([
    fetchGetOrtherRevenues(),
    fetchGetBankAccounts(),
    fetchGetRooms(),
  ]);
};

const fetchGetOrtherRevenues = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetOtherRevenuesResponse>(
    `/store/${currentStore?.id}/surcharge-setting/list`,
  );
};

const fetchCreateOrUpdateOrtherRevenue = async (
  values: CreateOrUpdateOtherRevenueFormValues,
) => {
  const {id, ...rest} = values;

  const currentStore = GetCurrentStore();
  if (id) {
    return HttpService.Post<FetchCreateOrUpdateOtherRevenueResponse>(
      `/store/${currentStore?.id}/surcharge-setting/update`,
      rest,
      {
        params: {id},
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdateOtherRevenueResponse>(
    `/store/${currentStore?.id}/surcharge-setting/create`,
    rest,
  );
};

const fetchDeleteOrtherRevenue = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(
    `/store/${currentStore?.id}/surcharge-setting/delete`,
    {
      params: {id},
    },
  );
};

const fetchGetBankAccounts = async () => {
  const currentStore = GetCurrentStore();
  const getData = (type: 'bank' | 'card') =>
    new Promise<BankAccountItem[]>(async resolve => {
      const response = await HttpService.Get<FetchGetBankAccountsResponse>(
        `/store/${currentStore?.id}/payment-method/list?type=${type}`,
      );
      const data = response.data.map(v => {
        return {
          ...v,
          type: type,
        };
      });
      resolve(data);
    });

  const data = await Promise.all([getData('bank'), getData('card')]);
  return [...data[0], ...data[1]];
};

const fetchCreateOrUpdatePaymentMethod = async (
  values: CreateOrUpdatePaymentMethodFormValues,
) => {
  const {id, ...rest} = values;
  const currentStore = GetCurrentStore();
  if (id) {
    return HttpService.Post<FetchCreateOrUpdatePaymentMethodResponse>(
      `/store/${currentStore?.id}/payment-method/update`,
      rest,
      {
        params: {id},
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdatePaymentMethodResponse>(
    `/store/${currentStore?.id}/payment-method/create`,
    rest,
  );
};

const fetchCalculateOrderTotalPrice = async (
  params: CalculateTotalOrderPriceParams,
) => {
  try {
    const currentStore = GetCurrentStore();
    const DEFAULT_DISCOUNT: OrderDiscountType = {
      type: 'cash',
      value: 0,
    };
    let body = {
      priceSetting: params.priceId,
      products: params.products
        .filter(v => v.quantity > 0)
        .map(v => {
          return {
            id: v.id,
            quantity: v.quantity,
          };
        }),
      discount: params.discount ?? DEFAULT_DISCOUNT,
      surcharges: params.surcharges ?? [],
      codFee: params.codFee ?? 0,
    };

    const {data} = await HttpService.Post<FetchCalculateOrderPriceResponse>(
      `/store/${currentStore?.id}/order/calc_order_price`,
      body,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchCalculateImportProductTotalPrice = async (
  products: Array<ImportedProductType>,
) => {
  const currentStore = GetCurrentStore();
  const data: Array<ImportedProductType> = products.map(v => {
    return {
      id: v.id,
      quantity: v.quantity,
      discount: v.discount,
      discountType: v.discountType,
      description: v.description,
      price: v.price,
    };
  });
  return HttpService.Post<FetchCalculateImportProductTotalPrice>(
    `/store/${currentStore?.id}/product-adjust/pre_calc`,
    {products: data},
  );
};

const fetchCreateOrder = async (values: CreateOrderParams) => {
  const currentStore = GetCurrentStore();
  const DEFAULT_DISCOUNT: OrderDiscountType = {
    type: 'cash',
    value: 0,
  };

  const {codFee, priceId, payments, roomId, ...rest} = values;
  let body: any = {
    ...rest,
    priceSetting: priceId,
    products: rest.products
      .filter(v => v.quantity > 0)
      .map(v => {
        return {
          id: v.id,
          quantity: v.quantity,
        };
      }),
    discount: rest.discount ?? DEFAULT_DISCOUNT,
    surcharges: rest.surcharges ?? [],
  };
  if (values.type === OrderType.TakeAway) {
    body = {
      ...body,
      payments,
    };
  }
  if (values.type === OrderType.BookByRoom) {
    body = {
      ...body,
      locationId: values.roomId,
    };
  }
  if (values.type === OrderType.Shipping) {
    body = {
      ...body,
      codFee: codFee ?? 0,
    };
  }

  return HttpService.Post<FetchCreateOrUpdateOrderResponse>(
    `/store/${currentStore?.id}/order/create`,
    body,
  );
};

const fetchGetOrderDetails = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetOrderDetailsResponse>(
    `/store/${currentStore?.id}/order/read?id=${id}`,
  );
};

const fetchDeleteOrder = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/order/delete?id=${id}`);
};

const fetchUpdateTakeAwayPaymentOrder = async (
  values: FetchUpdateTakeAwayPaymentOrderParams,
) => {
  const {id, payments} = values;

  const currentStore = GetCurrentStore();
  return HttpService.Post<FetchGetOrderDetailsResponse>(
    `/store/${currentStore?.id}/order/update?id=${id}`,
    {payments},
  );
};

const fetchUpdateBookByRoomPaymentOrder = async (
  values: FetchUpdateBookByRoomPaymentOrderParams,
) => {
  const {id, ...rest} = values;

  const currentStore = GetCurrentStore();
  return HttpService.Post<FetchGetOrderDetailsResponse>(
    `/store/${currentStore?.id}/order/update?id=${id}`,
    rest,
  );
};

const fetchUpdateShippingPaymentOrder = async (
  values: FetchUpdateShippingPaymentOrderParams,
) => {
  const {id, ...rest} = values;

  const currentStore = GetCurrentStore();
  return HttpService.Post<FetchCreateOrUpdateOrderResponse>(
    `/store/${currentStore?.id}/order/update?id=${id}`,
    rest,
  );
};

const formatUOMValueToString = (data: {
  name: string;
  uom: 'percent' | 'cash';
  value: number;
}) => {
  let result = data.name;
  if (data.uom === 'percent') {
    result += ` (${data.value}%)`;
  } else {
    result += ` (${toStringPrice(data.value)})`;
  }
  return result;
};

const getPaymentData = (paymentMethod: string, paid: string, total: number) => {
  let payment: OrderPaymentParams = {
    method: 'cash',
    name: null,
    account: null,
    isNew: true,
    receive: 0,
    return: 0,
  };
  if (paymentMethod !== 'cash') {
    const accounts = GetBankAccounts();
    const accountId = getBankAccountId(paymentMethod);
    const account = accounts.find(v => v.account === accountId);
    payment = {
      ...payment,
      method: account?.type as PaymentMethodType,
      name: account?.bank as string,
      account: accountId as string,
    };
  }
  payment.receive = toNumberPrice(paid);
  if (total === 0) {
    payment.return = 0;
  } else {
    payment.return =
      toNumberPrice(paid) - total > 0 ? toNumberPrice(paid) - total : 0;
  }

  return payment;
};

const getShippingData = (
  values: ShippingDeliveryFormValues,
  data: Array<PartnerItemType>,
) => {
  const shipper = data.find(v => v.id === parseInt(values.shipper));
  return {
    codAmount: toNumberPrice(values.paidCod),
    fee: values.paidShipper ? toNumberPrice(values.paidShipper) : 0,
    weight: values.weight ? parseInt(values.weight) : 0,
    shipperId: shipper?.id as number,
    shipperName: shipper?.name as string,
    shipperPhone: shipper?.phone as string,
    deposit: 0,
  };
};

const parseDataUpdateShippingPaymentOrder = (data: CreateOrUpdateOrderType) => {
  const {
    priceSetting,
    codFee,
    shipInfo,
    discountType,
    discountValue,
    id,
    products,
    surcharges,
    paymentType,
  } = data;
  return {
    products: products.map(v => {
      return {
        id: v.id,
        quantity: v.quantity,
      };
    }),
    discount: {
      type: discountType,
      value: discountValue,
    },
    surcharges: surcharges.map(v => v.id as number),
    codFee,
    priceSetting: priceSetting ?? -1,
    id,
    shipInfo: {
      deposit: shipInfo.deposit,
      shipperId: shipInfo.shipperId, // L???y partner id type = shipper. Ch??a c?? th?? ????? -1 qua b?????c ti???p theo c???p nh???t sau
      fee: shipInfo.fee, // Ph?? tr??? cho shipper: ????? m???c ?????nh l?? 0 n???u ch??a c??.
      shipperPhone: shipInfo.shipperPhone, // S??? ??i???n tho???i shipper l???y t??? partner. Ch??a c?? ????? null ho???c r???ng
      shipperName: shipInfo.shipperName, // Nh?? tr??n
      weight: shipInfo.weight, // Tr???ng l?????ng g??i h??ng (gram).
      codAmount: shipInfo.codAmount, // S??? ti??n ???ng tr?????c c???a shipper: L?? s??? ti???n kh??ch c???n tr??? - ph?? ship. V?? d??? kh??ch c???n tr??? (paymentRequire) 105.000??, ph?? ship 5000??. Th?? ti???n thu h??? s??? l?? 100.000.
    },
    paymentType,
  };
};

const getDiscountData = ({uom, value}: {uom: UOMType; value: string}) => {
  let _value = 0;
  if (!!value) {
    _value = uom === 'cash' ? toNumberPrice(value) : parseInt(value);
  }
  return {
    type: uom,
    value: _value,
  };
};

const fetchGetRooms = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetProductMetaResponse>(
    `/store/${currentStore?.id}/location/list?type=1`,
  );
};

const fetchCreateOrUpdateRoom = async (values: CreateOrUpdateRoomValues) => {
  const currentStore = GetCurrentStore();
  const {id, table, floor, room} = values;
  let body: any = {
    room: room ? parseInt(room) : 0,
  };

  if (!!table && !!floor) {
    body = {
      ...body,
      table: parseInt(table),
      floor: parseInt(floor),
    };
  } else {
    if (!!table) {
      body = {
        ...body,
        table: parseInt(table),
      };
    } else {
      body = {
        ...body,
        floor: parseInt(floor),
      };
    }
  }

  if (id) {
    return HttpService.Post(
      `/store/${currentStore?.id}/location/update`,
      body,
      {
        params: {
          id: id,
        },
      },
    );
  }
  return HttpService.Post(`/store/${currentStore?.id}/location/create`, body);
};

const fetchDeleteRoom = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/location/delete`, {
    params: {
      id,
    },
  });
};

const fetchGetOrderedRoom = async () => {
  const currentStore = GetCurrentStore();
  const {data} = await HttpService.Post<FetchGetOrderedRoomResponse>(
    `/store/${currentStore?.id}/order/list_inside_order`,
    {
      pageSize: -1,
    },
  );
  return {data: data.list};
};

const getBookByRoomStatusName = (status: BookByRoomOrderStatusType) => {
  switch (status) {
    case BookByRoomOrderStatusType.Processing:
      return '??ang x??? l??';
    case BookByRoomOrderStatusType.Success:
      return 'Ho??n th??nh ????n';
    case BookByRoomOrderStatusType.Cancel:
      return '???? h???y';
  }
};

const getImportStatusName = (status: ImportStatusType) => {
  switch (status) {
    case ImportStatusType.Processing:
      return '??ang x??? l??';
    case ImportStatusType.Done:
      return 'Ho??n th??nh ????n';
    case ImportStatusType.Cancel:
      return '???? h???y';
  }
};

const getReturnStatusName = (status: ReturnStatusType) => {
  switch (status) {
    case ReturnStatusType.Processing:
      return '??ang x??? l??';
    case ReturnStatusType.Done:
      return 'Ho??n th??nh ????n';
    case ReturnStatusType.Cancel:
      return '???? h???y';
  }
};

const fetchCreateOrUpdateImportProduct = (
  values: CreateOrUpdateImportProductParams,
) => {
  const {id, products, provider, payments, newStatus} = values;
  const data: Array<ImportedProductType> = products.map(v => {
    return {
      id: v.id,
      quantity: v.quantity,
      description: v.description,
      discount: v.discount,
      discountType: v.discountType,
      price: v.price,
    };
  });
  const currentStore = GetCurrentStore();

  if (id) {
    return HttpService.Post<FetchCreateOrUpdateImportProductResponse>(
      `/store/${currentStore?.id}/product-adjust/update_input?id=${id}`,
      {
        products: data,
        payments,
        newStatus,
      },
    );
  }

  return HttpService.Post<FetchCreateOrUpdateImportProductResponse>(
    `/store/${currentStore?.id}/product-adjust/create_input`,
    {
      provider,
      products: data,
    },
  );
};

const fetchGetImportedProducts = (params: FetchGetImportedProducts) => {
  const currentStore = GetCurrentStore();
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }

  const body = {
    startTimestamp: params?.startTimestamp ?? 1, // N???u mu???n l???y h???t th?? truy???n 1 -> now
    endTimestamp:
      params?.endTimestamp === 1
        ? new Date().getTime() * 1000
        : params?.endTimestamp,
    filter: {
      type: 'input', // -1 L???y h???t, 0: Tr???c ti???p, 1: COD, 2: B??n ph??ng.
      status: -1, // -1: All. 3: Ho??n th??nh, 4: ???? h???y
      context: params.keyword ?? '', // Text input
    },
    sort: {
      field: sortField,
      order: sortOrder,
    },
    pageSize: params.limit,
    currentPage: params.page,
  };

  return HttpService.Post<FetchGetImportedProductResponse>(
    `/store/${currentStore?.id}/product-adjust/list`,
    body,
  );
};

const fetchGetImportProductDetails = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetImportProductDetailsResponse>(
    `/store/${currentStore?.id}/product-adjust/read`,
    {
      params: {id},
    },
  );
};

const fetchDeleteImportProduct = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(
    `/store/${currentStore?.id}/product-adjust/delete_in`,
    {
      params: {id},
    },
  );
};

const fetchDeleteReturnProduct = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/order/refund/delete`, {
    params: {id},
  });
};

const fetchUpdateReturnProductPaymentOrder = async (
  values: FetchUpdateReturnProductParams,
) => {
  const currentStore = GetCurrentStore();
  const {payments, id} = values;

  await HttpService.Post(
    `/store/${currentStore?.id}/order/refund/update`,
    {
      payments,
      newStatus: 1,
      products: values.products.map(v => {
        return {
          id: v.id,
          quantity: v.quantity,
        };
      }),
    },
    {
      params: {id},
    },
  );
};

const fetchCreateReturnProduct = async (
  values: FetchCreateReturnProductParams,
) => {
  const currentStore = GetCurrentStore();
  const {
    orderId,
    products,
    refundFee,
    otherRefund,
    priceSetting,
    guestId,
    payments,
  } = values;
  const body = {
    refundFee,
    otherRefund,
    products: products.map(v => {
      return {
        id: v.id,
        quantity: v.quantity,
      };
    }),
  };
  // normal return product
  if (orderId) {
    const {data} = await HttpService.Post<{data: {id: number}}>(
      `/store/${currentStore?.id}/order/refund/create`,
      {
        orderId,
        ...body,
      },
    );
    await fetchUpdateReturnProductPaymentOrder({
      id: data.id,
      payments,
      products: body.products,
    });
  } else {
    // fast return post
    await HttpService.Post<{data: {id: number}}>(
      `/store/${currentStore?.id}/order/fast-refund/create`,
      {
        priceSetting,
        guestId,
        payments,
        ...body,
      },
    );
  }
};

const fetchGetRefundList = async (params: FetchGetRefundListParams) => {
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const currentStore = GetCurrentStore();

  const body = {
    startTimestamp: params?.startTimestamp ?? 1, // N???u mu???n l???y h???t th?? truy???n 1 -> now
    endTimestamp:
      params?.endTimestamp === 1
        ? new Date().getTime() * 1000
        : params?.endTimestamp,
    filter: {
      type: params.type ?? -1, // -1 L???y h???t. Lo???i ????n h??ng t??? 0->2
      paymentStatus: params.paymentStatus ?? -1, // 0: Ch??a thanh to??n, 1: ???? thanh to??n 1 ph???n, 2: Xong
      status: params.status ?? -1, // -1: All. 0: ??ang x??? l??, 1: Ho??n th??nh, 2: ???? h???y
      context: params.keyword ?? '', // Text input
    },
    sort: {
      field: sortField,
      order: sortOrder,
    },
    pageSize: params.limit,
    currentPage: params.page,
  };

  return HttpService.Post<FetchGetRefundListResponse>(
    `/store/${currentStore?.id}/order/refund/list`,
    body,
  );
};

const fetchGetRefundDetails = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetRefundDetailsResponse>(
    `/store/${currentStore?.id}/order/refund/read?id=${id}`,
  );
};

const fetchCreateOrUpdateReturnOfImportedGood = (
  values: CreateOrUpdateImportProductParams,
) => {
  const {id, products, provider, payments, newStatus} = values;
  const data: Array<ImportedProductType> = products.map(v => {
    return {
      id: v.id,
      quantity: v.quantity,
      description: v.description,
      discount: v.discount,
      discountType: v.discountType,
      price: v.price,
    };
  });

  const currentStore = GetCurrentStore();
  if (id) {
    return HttpService.Post<FetchCreateOrUpdateImportProductResponse>(
      `/store/${currentStore?.id}/product-adjust/update_output?id=${id}`,
      {
        products: data,
        payments,
        newStatus,
      },
    );
  }

  return HttpService.Post<FetchCreateOrUpdateImportProductResponse>(
    `/store/${currentStore?.id}/product-adjust/create_output`,
    {
      provider,
      products: data,
    },
  );
};

const fetchGetReturnOrImportedGoods = (
  params: FetchGetReturnOrImportedGoods,
) => {
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
    filter: {
      type: 'output',
      status: -1,
      context: params.keyword ?? '',
    },
    sort: {
      field: sortField,
      order: sortOrder,
    },
    pageSize: params.limit,
    currentPage: params.page,
  };

  return HttpService.Post<FetchGetReturnOrImportedGoodsResponse>(
    `/store/${currentStore?.id}/product-adjust/list`,
    body,
  );
};

const fetchDeleteReturnOfImportedGood = (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(
    `/store/${currentStore?.id}/product-adjust/delete_out`,
    {
      params: {id},
    },
  );
};

const fetchCalculateReturnProductTotalPrice = async (
  params: FetchCalculateReturnProductTotalPriceParams,
) => {
  let total = 0;
  const currentStore = GetCurrentStore();
  const products = params.products.map(v => {
    return {
      id: v.id,
      quantity: v.quantity,
    };
  });
  if (params.orderId) {
    const {data} = await HttpService.Post(
      `/store/${currentStore?.id}/order/refund/pre_calc`,
      {
        ...params,
        products,
      },
    );
    total = data.productPrice as number;
  } else {
    const {data} = await HttpService.Post(
      `/store/${currentStore?.id}/order/fast-refund/pre_calc`,
      {
        products,
        priceSetting: params.priceSetting,
      },
    );
    total = data.productPrice as number;
  }
  return total;
};

const getPaymentMethodName = (method: PaymentMethodType) => {
  switch (method) {
    case 'cod':
      return 'Thanh to??n COD';
    case 'bank':
      return 'Chuy???n kho???n';
    case 'cash':
      return 'Ti???n m???t';
    case 'card':
      return 'Qu???t Th???';
    case 'paidlater':
      return 'Thanh to??n sau';
  }
};

export const OrderService = {
  fetchGetTakeAwayOrders,
  fetchGetShippingOrders,

  fetchGetOrtherRevenues,
  fetchCreateOrUpdateOrtherRevenue,
  fetchDeleteOrtherRevenue,

  fetchGetOrderMetaData,

  fetchGetBankAccounts,
  fetchCreateOrUpdatePaymentMethod,

  fetchCalculateOrderTotalPrice,
  fetchUpdateTakeAwayPaymentOrder,
  fetchUpdateShippingPaymentOrder,
  fetchUpdateBookByRoomPaymentOrder,

  fetchCreateOrder,
  fetchGetOrders,
  fetchGetOrderDetails,
  fetchDeleteOrder,

  fetchGetRooms,
  fetchCreateOrUpdateRoom,
  fetchDeleteRoom,

  fetchGetOrderedRoom,

  fetchCreateOrUpdateImportProduct,
  fetchCalculateImportProductTotalPrice,
  fetchGetImportedProducts,
  fetchGetImportProductDetails,
  fetchDeleteImportProduct,

  fetchUpdateReturnProductPaymentOrder,
  fetchGetRefundList,
  fetchGetRefundDetails,
  fetchCalculateReturnProductTotalPrice,
  fetchDeleteReturnProduct,
  fetchCreateReturnProduct,
  fetchCreateOrUpdateReturnOfImportedGood,
  fetchGetReturnOrImportedGoods,
  fetchDeleteReturnOfImportedGood,

  getImportStatusName,
  getReturnStatusName,
  getPaymentMethodName,
  getPaymentData,
  getShippingData,
  parseDataUpdateShippingPaymentOrder,
  getDiscountData,
  getBookByRoomStatusName,

  formatUOMValueToString,
};
