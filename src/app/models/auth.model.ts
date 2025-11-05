export interface LoginRequest {
  email: string;
}

export interface LoginResponse {
  isValid: boolean;
  message: string;
}

export interface VerifyRequest {
  code: string;
  email: string;
}


export interface VerifyResponse {
    isValid: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    accessToken: AccessToken;
    user:        User;
}

export interface AccessToken {
    token:      string;
    expiration: number;
}

export interface User {
    id:        number;
    firstName: string;
    lastName:  string;
    email:     string;
    phone:     string;
    roleId:    number;
    roleName:  string;
}
