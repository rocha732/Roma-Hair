export interface LoginRequest {
  email: string;
}

export interface LoginResponse {
    isValid: boolean;
    message: string;
}