import {createAsyncThunk} from '@reduxjs/toolkit';
import {ProductService} from 'services/ProductService';
import {CreateOrUpdatePriceFormValues} from 'types/Properties';
import {ProductMetaType} from 'types/Responses/FetchGetProductMetaResponse';

export const GetCategoriesPrefix = '@Product/GetCategories';
export const DeleteCategoryPrefix = '@Product/DeleteCategory';
export const CreateOrUpdateCategoryPrefix = '@Product/CreateOrUpdateCategory';

export const GetBrandsPrefix = '@Product/GetBrands';
export const DeleteBrandPrefix = '@Product/DeleteBrand';
export const CreateOrUpdateBrandPrefix = '@Product/CreateOrUpdateBrand';

export const GetLocationsPrefix = '@Product/GetLocations';
export const DeleteLocationPrefix = '@Product/DeleteLocation';
export const CreateOrUpdateLocationPrefix = '@Product/CreateOrUpdateLocation';

export const GetPropertiesPrefix = '@Product/GetProperties';
export const DeletePropertyPrefix = '@Product/DeleteProperty';
export const CreateOrUpdatePropertyPrefix = '@Product/CreateOrUpdateProperty';

export const GetProductMetaDataPrefix = '@Product/GetProductMetaData';

export const GetPricePrefix = '@Product/GetPrice';
export const CreateOrUpdatePricePrefix = '@Product/CreateOrUpdatePrice';
export const DeletePricePrefix = '@Product/DeletePricePrefix';

export const fetchGetProductMetaData = createAsyncThunk(
  GetProductMetaDataPrefix,
  async () => {
    return await ProductService.fetchGetProductMetaData();
  },
);

export const fetchGetCategories = createAsyncThunk(
  GetCategoriesPrefix,
  async () => {
    return await ProductService.fetchGetCategories();
  },
);

export const fetchCreateOrUpdateCategory = createAsyncThunk(
  CreateOrUpdateCategoryPrefix,
  async (values: ProductMetaType) => {
    return await ProductService.fetchCreateOrUpdateCategory(values);
  },
);

export const fetchDeleteCategory = createAsyncThunk(
  DeleteCategoryPrefix,
  async (id: number) => {
    await ProductService.fetchDeleteCategory(id);
    return id;
  },
);

export const fetchGetBrands = createAsyncThunk(GetBrandsPrefix, async () => {
  return await ProductService.fetchGetBrands();
});

export const fetchCreateOrUpdateBrand = createAsyncThunk(
  CreateOrUpdateBrandPrefix,
  async (values: ProductMetaType) => {
    return await ProductService.fetchCreateOrUpdateBrand(values);
  },
);

export const fetchDeleteBrand = createAsyncThunk(
  DeleteBrandPrefix,
  async (id: number) => {
    await ProductService.fetchDeleteBrand(id);
    return id;
  },
);

export const fetchGetLocations = createAsyncThunk(
  GetLocationsPrefix,
  async () => {
    return await ProductService.fetchGetLocations();
  },
);

export const fetchCreateOrUpdateLocation = createAsyncThunk(
  CreateOrUpdateLocationPrefix,
  async (values: ProductMetaType) => {
    return await ProductService.fetchCreateOrUpdateLocation(values);
  },
);

export const fetchDeleteLocation = createAsyncThunk(
  DeleteLocationPrefix,
  async (id: number) => {
    await ProductService.fetchDeleteLocation(id);
    return id;
  },
);

export const fetchGetProperties = createAsyncThunk(
  GetPropertiesPrefix,
  async () => {
    return await ProductService.fetchGetPropperties();
  },
);

export const fetchCreateOrUpdateProperty = createAsyncThunk(
  CreateOrUpdatePropertyPrefix,
  async (values: ProductMetaType) => {
    return await ProductService.fetchCreateOrUpdateProperty(values);
  },
);

export const fetchDeleteProperty = createAsyncThunk(
  DeletePropertyPrefix,
  async (id: number) => {
    await ProductService.fetchDeleteProperty(id);
    return id;
  },
);

export const fetchGetPrice = createAsyncThunk(GetPricePrefix, async () => {
  return await ProductService.fetchGetPrice();
});

export const fetchCreateOrUpdatePrice = createAsyncThunk(
  CreateOrUpdatePricePrefix,
  async (values: CreateOrUpdatePriceFormValues) => {
    return await ProductService.fetchCreateOrUpdatePrice(values);
  },
);

export const fetchDeletePrice = createAsyncThunk(
  DeletePricePrefix,
  async (id: number) => {
    await ProductService.fetchDeletePrice(id);
    return id;
  },
);
