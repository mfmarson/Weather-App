export interface UserData {
  userId: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
