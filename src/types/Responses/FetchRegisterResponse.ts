export interface FetchRegisterResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
