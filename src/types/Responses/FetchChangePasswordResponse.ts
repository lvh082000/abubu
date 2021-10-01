export interface FetchChangePasswordResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
