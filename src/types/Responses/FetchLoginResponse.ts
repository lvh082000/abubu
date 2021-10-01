export interface FetchLoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
