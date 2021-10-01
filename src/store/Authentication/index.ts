import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FetchLoginResponse} from 'types/Responses/FetchLoginResponse';
import {FetchRegisterResponse} from 'types/Responses/FetchRegisterResponse';
import {FetchChangePasswordResponse} from 'types/Responses/FetchChangePasswordResponse';
import {fetchLogin, fetchRegister, changePassword} from './ThunkActions';

interface AuthenticationStore {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthenticationStore = {
  accessToken: '',
  refreshToken: '',
};

const AuthenticationSlice = createSlice({
  name: 'AUTHENTICATION_SLICE',
  initialState,
  reducers: {
    logout: state => {
      state.refreshToken = initialState.refreshToken;
      state.accessToken = initialState.accessToken;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<FetchLoginResponse>) => {
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
      },
    );
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<FetchRegisterResponse>) => {
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
      },
    );
    builder.addCase(
      changePassword.fulfilled,
      (state, action: PayloadAction<FetchChangePasswordResponse>) => {
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
      },
    );
  },
});

export default AuthenticationSlice.reducer;

export * from './ThunkActions';

export * from './Selectors';

export const {logout} = AuthenticationSlice.actions;
