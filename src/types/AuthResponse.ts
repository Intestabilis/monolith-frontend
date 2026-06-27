export interface AuthResponse {
  accessToken: string;
  user: { id: string; email: string; isActivated: boolean; username: string };
}
