import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  FetchGetProfileResponse,
  ProfileType,
} from 'types/Responses/FetchGetProfileResponse';
import {
  FetchGetShopResponse,
  ShopDetailsType,
} from 'types/Responses/FetchGetShopResponse';
import {
  fetchCreateOrUpdateStore,
  fetchGetCurrentStore,
  fetchGetProfile,
  fetchUpdateProfile,
} from './ThunkActions';

interface MeStore {
  profile: ProfileType | undefined;
  currentStore: ShopDetailsType | undefined;
}

const initialState: MeStore = {
  profile: undefined,
  currentStore: undefined,
};

const MeSlice = createSlice({
  name: 'ME_SLICE',
  initialState,
  reducers: {
    logout: state => {
      state.profile = initialState.profile;
      state.currentStore = initialState.currentStore;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchGetProfile.fulfilled,
      (state, action: PayloadAction<FetchGetProfileResponse>) => {
        state.profile = action.payload.data;
      },
    );
    builder.addCase(
      fetchUpdateProfile.fulfilled,
      (state, action: PayloadAction<FetchGetProfileResponse>) => {
        state.profile = action.payload.data;
      },
    );
    builder.addCase(
      fetchGetCurrentStore.fulfilled,
      (state, action: PayloadAction<FetchGetShopResponse>) => {
        state.currentStore = action.payload.data;
      },
    );
    builder.addCase(
      fetchCreateOrUpdateStore.fulfilled,
      (state, action: PayloadAction<FetchGetShopResponse>) => {
        state.currentStore = action.payload.data;
      },
    );
  },
});

export default MeSlice.reducer;

export * from './Selectors';
export * from './ThunkActions';

export const {logout} = MeSlice.actions;
