import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {flatten} from 'lodash';
import Settings from 'config/Settings';
import {DialogRef} from 'components/Dialog';
import {GetAuthentication} from 'store/Authentication';

interface CustomRequestConfig extends AxiosRequestConfig {
  dialogType?: 'Dialog' | 'None';
}

interface CustomAxiosError extends AxiosError {
  config: CustomRequestConfig;
}

const getErrorMessage = (error: CustomAxiosError) => {
  let msg = 'Something were wrong. Please try again';
  if (error.response && typeof error.response.data === 'string') {
    msg = error.response.data;
  }
  if (error.response && error.response.data) {
    if (
      error.response.data.error &&
      typeof error.response.data.error === 'string'
    ) {
      msg = error.response.data.error;
    }
    if (error.response.data.message) {
      msg = error.response.data.message;
    }
    if (error.response.data.messages) {
      msg = error.response.data.messages;
    }
    if (typeof error.response.data.errors === 'object') {
      msg = flatten(Object.values(error.response.data.errors)).join('\r\n');
    }
  }
  return msg;
};

axios.defaults.baseURL = Settings.API_URL;

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: CustomAxiosError) => {
    const errorMessage = getErrorMessage(error);
    if (error.config.dialogType === 'Dialog') {
      // TODO show error dialog in here...
      DialogRef.show({
        type: 'Error',
        message: errorMessage,
        title: 'Lỗi dữ liệu',
      });
    }

    return Promise.reject(error);
  },
);

const createAxiosConfig = (config: CustomRequestConfig = {}) => {
  const {accessToken} = GetAuthentication();
  const AxiosConfig = {
    ...config,
    dialogType: config.dialogType ?? 'Dialog',
    headers: {
      ...config.headers,
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  };
  return AxiosConfig;
};

export const HttpHelper = {
  getErrorMessage,
};

export default class HttpService {
  static async Get<T>(url: string, config: CustomRequestConfig = {}) {
    return await axios
      .get<T>(url, createAxiosConfig(config))
      .then(res => res.data);
  }

  static async Post<T>(
    url: string,
    data: any,
    config: CustomRequestConfig = {},
  ) {
    return await axios
      .post<T>(url, data, createAxiosConfig(config))
      .then(res => res.data);
  }

  static async Put<T>(
    url: string,
    data: any,
    config: CustomRequestConfig = {},
  ) {
    return await axios
      .put(url, data, createAxiosConfig(config))
      .then(res => res.data);
  }

  static async Patch<T>(
    url: string,
    data: any,
    config: CustomRequestConfig = {},
  ) {
    return await axios
      .patch<T>(url, data, createAxiosConfig(config))
      .then(res => res.data);
  }

  static async Delete<T>(url: string, config: CustomRequestConfig = {}) {
    return await axios
      .delete<T>(url, createAxiosConfig(config))
      .then(res => res.data);
  }
}
