export type AuthResponseDto = {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};