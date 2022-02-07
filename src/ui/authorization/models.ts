export interface UserDto {
  name: string,
  email: string,
  password: string,
}

export type User = Pick<UserDto, 'email' | 'password'>;

export interface JWTToken {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}

export interface ApiParams {
  method: ApiMethod;
  path?: string;
  body?: string;
}

export enum ApiMethod {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
}
