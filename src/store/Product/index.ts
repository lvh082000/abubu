import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cloneDeep} from 'services/UtilService';
import {FetchCreateOrUpdateProductMetaResponse} from 'types/Responses/FetchCreateOrUpdateProductMetaResponse';
import {
  FetchGetProductMetaResponse,
  ProductMetaType,
} from 'types/Responses/FetchGetProductMetaResponse';
import {
  FetchGetPriceResponse,
  PriceType,
} from 'types/Responses/FetchGetPriceResponse';
import {
  fetchCreateOrUpdateBrand,
  fetchCreateOrUpdateCategory,
  fetchCreateOrUpdateLocation,
  fetchCreateOrUpdatePrice,
  fetchCreateOrUpdateProperty,
  fetchDeleteBrand,
  fetchDeleteCategory,
  fetchDeleteLocation,
  fetchDeletePrice,
  fetchDeleteProperty,
  fetchGetBrands,
  fetchGetCategories,
  fetchGetLocations,
  fetchGetPrice,
  fetchGetProductMetaData,
  fetchGetProperties,
} from './ThunkActions';
import {FetchCreateOrUpdatePriceResponse} from 'types/Responses/FetchCreateOrUpdatePriceResponse';
import Constants from 'config/Constants';

const DEFAULT_PRICE = Constants.DefaultPrice as PriceType;

interface ProductStore {
  categories: Array<ProductMetaType>;
  brands: Array<ProductMetaType>;
  locations: Array<ProductMetaType>;
  properties: Array<ProductMetaType>;
  prices: Array<PriceType>;
  isMetaDataLoaded: boolean;
}

const initialState: ProductStore = {
  categories: [],
  brands: [],
  locations: [],
  properties: [],
  prices: [DEFAULT_PRICE],
  isMetaDataLoaded: false,
};

const ProductSlice = createSlice({
  name: 'PRODUCT_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchGetProductMetaData.fulfilled,
      (state, action: PayloadAction<FetchGetProductMetaResponse[]>) => {
        state.categories = action.payload[0].data;
        state.brands = action.payload[1].data;
        state.locations = action.payload[2].data;
        state.properties = action.payload[3].data;
        state.isMetaDataLoaded = true;
      },
    );
    // CRUD Category
    builder.addCase(
      fetchGetCategories.fulfilled,
      (state, action: PayloadAction<FetchGetProductMetaResponse>) => {
        state.categories = action.payload.data;
      },
    );
    builder.addCase(
      fetchCreateOrUpdateCategory.fulfilled,
      (
        state,
        action: PayloadAction<FetchCreateOrUpdateProductMetaResponse>,
      ) => {
        const index = state.categories.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.categories);
          data[index] = action.payload.data;
          state.categories = data;
        } else {
          state.categories = [...state.categories, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeleteCategory.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter(
          v => v.id !== action.payload,
        );
      },
    );
    // CRUD Brand
    builder.addCase(
      fetchGetBrands.fulfilled,
      (state, action: PayloadAction<FetchGetProductMetaResponse>) => {
        state.brands = action.payload.data;
      },
    );
    builder.addCase(
      fetchCreateOrUpdateBrand.fulfilled,
      (
        state,
        action: PayloadAction<FetchCreateOrUpdateProductMetaResponse>,
      ) => {
        const index = state.brands.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.brands);
          data[index] = action.payload.data;
          state.brands = data;
        } else {
          state.brands = [...state.brands, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeleteBrand.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.brands = state.brands.filter(v => v.id !== action.payload);
      },
    );
    // CRUD Location
    builder.addCase(
      fetchGetLocations.fulfilled,
      (state, action: PayloadAction<FetchGetProductMetaResponse>) => {
        state.locations = action.payload.data;
      },
    );
    builder.addCase(
      fetchCreateOrUpdateLocation.fulfilled,
      (
        state,
        action: PayloadAction<FetchCreateOrUpdateProductMetaResponse>,
      ) => {
        const index = state.locations.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.locations);
          data[index] = action.payload.data;
          state.locations = data;
        } else {
          state.locations = [...state.locations, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeleteLocation.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.locations = state.locations.filter(v => v.id !== action.payload);
      },
    );
    // CRUD Property
    builder.addCase(
      fetchGetProperties.fulfilled,
      (state, action: PayloadAction<FetchGetProductMetaResponse>) => {
        state.properties = action.payload.data;
      },
    );
    builder.addCase(
      fetchCreateOrUpdateProperty.fulfilled,
      (
        state,
        action: PayloadAction<FetchCreateOrUpdateProductMetaResponse>,
      ) => {
        const index = state.properties.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.properties);
          data[index] = action.payload.data;
          state.properties = data;
        } else {
          state.properties = [...state.properties, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeleteProperty.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.properties = state.properties.filter(
          v => v.id !== action.payload,
        );
      },
    );
    // CRUD Price
    builder.addCase(
      fetchGetPrice.fulfilled,
      (state, action: PayloadAction<FetchGetPriceResponse>) => {
        state.prices = [DEFAULT_PRICE, ...action.payload.data];
      },
    );
    builder.addCase(
      fetchCreateOrUpdatePrice.fulfilled,
      (state, action: PayloadAction<FetchCreateOrUpdatePriceResponse>) => {
        const index = state.prices.findIndex(
          v => v.id === action.payload.data.id,
        );
        if (index >= 0) {
          const data = cloneDeep(state.prices);
          data[index] = action.payload.data;
          state.prices = data;
        } else {
          state.prices = [...state.prices, action.payload.data];
        }
      },
    );
    builder.addCase(
      fetchDeletePrice.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.prices = state.prices.filter(v => v.id !== action.payload);
      },
    );
  },
});

export default ProductSlice.reducer;

export * from './Selectors';

export * from './ThunkActions';
