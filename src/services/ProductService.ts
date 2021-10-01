import HttpService from 'services/HttpService';
import {GetCurrentStore} from 'store/Me';
import {
  FetchCreateOrUpdateInventoryParams,
  FetchCreateOrUpdatePriceParams,
  FetchCreateOrUpdateProductParams,
  FetchGetProductsParams,
  FetchGetInventoryParams,
} from 'types/Params';
import {FetchCreateOrUpdateProductMetaResponse} from 'types/Responses/FetchCreateOrUpdateProductMetaResponse';
import {
  FetchGetProductMetaResponse,
  ProductMetaType,
} from 'types/Responses/FetchGetProductMetaResponse';
import {FetchGetProductsResponse} from 'types/Responses/FetchGetProductsResponse';
import {FileService} from 'services/FileService';
import {
  FetchReadProductResponse,
  ProductDetailsType,
} from 'types/Responses/FetchReadProductResponse';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {
  CreateOrUpdatePriceFormValues,
  CreateOrUpdateProductFormValues,
} from 'types/Properties';
import {
  FetchGetPriceResponse,
  PriceType,
} from 'types/Responses/FetchGetPriceResponse';
import {FetchCreateOrUpdatePriceResponse} from 'types/Responses/FetchCreateOrUpdatePriceResponse';
import {FetchGetInventoryResponse} from 'types/Responses/FetchGetInventoryResponse';
import {FetchGetInventoryListResponse} from 'types/Responses/FetchGetInventoryListResponse';

const fetchGetProductMetaData = async () => {
  return await Promise.all([
    fetchGetCategories(),
    fetchGetBrands(),
    fetchGetLocations(),
    fetchGetPropperties(),
  ]);
};

const fetchGetProducts = async (params: FetchGetProductsParams) => {
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const currentStore = GetCurrentStore();
  const body = {
    currentPage: params.page,
    pageSize: params.limit,
    sort: {
      field: sortField,
      order: sortOrder,
    },
    context: params.keyword ?? '',
    filter: {
      priceSetting: params?.priceSetting ?? -1,
    },
  };
  return HttpService.Post<FetchGetProductsResponse>(
    `/store/${currentStore?.id}/product/list`,
    body,
  );
};

const fetchCreateOrUpdateProduct = async (
  values: CreateOrUpdateProductFormValues,
) => {
  const currentStore = GetCurrentStore();
  const {id, uploadedImages, removedImages, ...rest} = values;
  const data: FetchCreateOrUpdateProductParams = {
    ...rest,
    sellPrice: toNumberPrice(values.sellPrice),
    costPrice: toNumberPrice(values.costPrice),
    abubuPrice: values?.abubuPrice ? toNumberPrice(values?.abubuPrice) : 0,
    quantity: values.quantity ? parseInt(values.quantity) : 0,
    weight: !!values.weight ? parseInt(values.weight) : 0,
    images: values.images ?? [],
    locationId: values.locationId ? parseInt(values.locationId) : 0,
    brandId: values.brandId ? parseInt(values.brandId) : 0,
    groupId: values.groupId ? parseInt(values.groupId) : 0,
    code: null,
  };
  let _uploadedImages = [],
    _oldImages: Array<string> = data.images;

  if (uploadedImages.length > 0) {
    const promises = uploadedImages.map(v => FileService.uploadFile(v));
    _uploadedImages = await Promise.all(promises);
  }
  if (removedImages.length > 0) {
    const promises = removedImages.map(v => FileService.fetchRemoveFile(v));
    Promise.all(promises);
    _oldImages = data.images.filter(v => !removedImages.includes(v));
  }

  data.images = [..._oldImages, ..._uploadedImages];

  console.log('data', data);

  if (id) {
    return await HttpService.Post(
      `/store/${currentStore?.id}/product/update`,
      data,
      {
        params: {id},
      },
    );
  }

  return await HttpService.Post(
    `/store/${currentStore?.id}/product/create`,
    data,
  );
};

const fetchDeleteProduct = async (
  id: number,
  images?: Array<string> | undefined,
) => {
  if (images && images.length > 0) {
    const promises = images.map(v => FileService.fetchRemoveFile(v));
    Promise.all(promises);
  }
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/product/delete`, {
    params: {id},
  });
};

const fetchGetProduct = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchReadProductResponse>(
    `/store/${currentStore?.id}/product/read`,
    {
      params: {id},
    },
  );
};

const fetchGetCategories = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetProductMetaResponse>(
    `/store/${currentStore?.id}/product/group`,
  );
};

const fetchCreateOrUpdateCategory = async (values: ProductMetaType) => {
  const currentStore = GetCurrentStore();
  if (values.id) {
    return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
      `/store/${currentStore?.id}/product/group/update`,
      values,
      {
        params: {
          id: values.id,
        },
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
    `/store/${currentStore?.id}/product/group/create`,
    values,
  );
};

const fetchDeleteCategory = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/product/group/delete`, {
    params: {id},
  });
};

const fetchGetLocations = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetProductMetaResponse>(
    `/store/${currentStore?.id}/location/list?type=0`,
  );
};

const fetchCreateOrUpdateLocation = async (values: ProductMetaType) => {
  const currentStore = GetCurrentStore();
  if (values.id) {
    return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
      `/store/${currentStore?.id}/location/update`,
      values,
      {
        params: {
          id: values.id,
        },
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
    `/store/${currentStore?.id}/location/create`,
    values,
  );
};

const fetchDeleteLocation = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/location/delete`, {
    params: {
      id,
    },
  });
};

const fetchGetBrands = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetProductMetaResponse>(
    `/store/${currentStore?.id}/product/brand`,
  );
};

const fetchCreateOrUpdateBrand = async (values: ProductMetaType) => {
  const {id, ...rest} = values;
  const currentStore = GetCurrentStore();
  if (id) {
    return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
      `/store/${currentStore?.id}/product/brand/update`,
      rest,
      {
        params: {id},
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
    `/store/${currentStore?.id}/product/brand/create`,
    rest,
  );
};

const fetchDeleteBrand = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/product/brand/delete`, {
    params: {id},
  });
};

const fetchGetPropperties = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetProductMetaResponse>(
    `/store/${currentStore?.id}/product/property/list`,
  );
};

const fetchCreateOrUpdateProperty = async (values: ProductMetaType) => {
  const currentStore = GetCurrentStore();
  if (values.id) {
    return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
      `/store/${currentStore?.id}/product/property/update`,
      values,
      {
        params: {
          id: values.id,
        },
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdateProductMetaResponse>(
    `/store/${currentStore?.id}/product/property/create`,
    values,
  );
};

const fetchDeleteProperty = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(
    `/store/${currentStore?.id}/product/property/delete`,
    {
      params: {
        id,
      },
    },
  );
};

const fetchGetPrice = async () => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetPriceResponse>(
    `/store/${currentStore?.id}/price-setting/list`,
  );
};

const fetchCreateOrUpdatePrice = async (
  values: CreateOrUpdatePriceFormValues,
) => {
  const currentStore = GetCurrentStore();
  const {id, value, ...rest} = values;
  const data: FetchCreateOrUpdatePriceParams = {
    ...rest,
    value: toNumberPrice(value),
  };

  if (id) {
    return HttpService.Post<FetchCreateOrUpdatePriceResponse>(
      `/store/${currentStore?.id}/price-setting/update`,
      data,
      {
        params: {id},
      },
    );
  }
  return HttpService.Post<FetchCreateOrUpdatePriceResponse>(
    `/store/${currentStore?.id}/price-setting/create`,
    data,
  );
};

const fetchDeletePrice = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(`/store/${currentStore?.id}/price-setting/delete`, {
    params: {id},
  });
};

const fetchGetInventoryList = async (params: FetchGetInventoryParams) => {
  let sortField = 'createdAt';
  let sortOrder = 'desc';
  if (params.sort) {
    const arr = params.sort.split(',');
    sortField = arr[0];
    sortOrder = arr[1];
  }
  const currentStore = GetCurrentStore();
  const body = {
    context: params.keyword ?? '',
    sort: {
      field: sortField,
      order: sortOrder,
    },
    pageSize: params.limit,
    currentPage: params.page,
    filter: {
      status: params.status,
      done: params.done,
    },
  };
  return HttpService.Post<FetchGetInventoryListResponse>(
    `store/${currentStore?.id}/warehouse/inventory/list`,
    body,
  );
};

const fetchCreateOrUpdateInventory = async (
  values: FetchCreateOrUpdateInventoryParams,
) => {
  const currentStore = GetCurrentStore();
  const {id, ...rest} = values;

  if (id) {
    return HttpService.Post(
      `/store/${currentStore?.id}/warehouse/inventory/update`,
      rest,
      {
        params: {id},
      },
    );
  }
  return HttpService.Post(
    `/store/${currentStore?.id}/warehouse/inventory/create`,
    rest,
  );
};

const fetchGetInventory = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Get<FetchGetInventoryResponse>(
    `/store/${currentStore?.id}/warehouse/inventory/read`,
    {
      params: {id},
    },
  );
};

const fetchDeleteInventory = async (id: number) => {
  const currentStore = GetCurrentStore();
  return HttpService.Delete(
    `/store/${currentStore?.id}/warehouse/inventory/delete`,
    {
      params: {id},
    },
  );
};

const mapDataToProductForm = (data: ProductDetailsType | undefined) => {
  return {
    barcode: data?.barcode ?? '',
    name: data?.name ?? '',
    sellPrice: data ? toStringPrice(data.sellPrice) : '',
    costPrice: data ? toStringPrice(data.costPrice) : '',
    quantity: data?.quantity.toString() ?? '',
    weight: data?.weight.toString() ?? '',
    groupId: data?.groupId.toString() ?? '',
    brandId: data?.brandId.toString() ?? '',
    description: data?.description ?? '',
    showOnWeb: false,
    goodSale: false,
    isNew: false,
    promotion: false,
    abubuPrice: data ? toStringPrice(data.abubuPrice) : '',
    properties: data
      ? data.properties.map(v => {
          return {
            name: v.name,
            attribute: v.attribute,
            propId: v.propId,
          };
        })
      : [],
    locationId: data ? data.locationId.toString() : '',
    avability: !!data?.avability,
    images: data?.images ?? [],
    uploadedImages: [],
    removedImages: [],
  };
};

const mapDataToPriceForm = (data: PriceType | undefined) => {
  return {
    name: data?.name ?? '',
    type: data ? data.type : 0,
    uom: data?.uom ?? 'cash',
    value:
      data && data.value
        ? data.uom === 'cash'
          ? toStringPrice(data.value)
          : data.value.toString()
        : '',
  };
};

export const ProductService = {
  fetchGetProductMetaData,

  fetchGetProducts,
  fetchCreateOrUpdateProduct,
  fetchDeleteProduct,
  fetchGetProduct,

  fetchGetCategories,
  fetchCreateOrUpdateCategory,
  fetchDeleteCategory,

  fetchGetLocations,
  fetchCreateOrUpdateLocation,
  fetchDeleteLocation,

  fetchGetBrands,
  fetchCreateOrUpdateBrand,
  fetchDeleteBrand,

  fetchGetPropperties,
  fetchCreateOrUpdateProperty,
  fetchDeleteProperty,

  fetchGetPrice,
  fetchCreateOrUpdatePrice,
  fetchDeletePrice,

  fetchGetInventoryList,
  fetchCreateOrUpdateInventory,
  fetchGetInventory,
  fetchDeleteInventory,

  mapDataToProductForm,
  mapDataToPriceForm,
};
