export interface UserDto {
  readonly name: string,
  readonly email: string,
  readonly password: string,
}

export type User = Pick<UserDto, 'email' | 'password'>;

export interface JWTToken {
  readonly message: string,
  readonly token: string,
  readonly refreshToken: string,
  readonly userId: string,
  readonly name: string,
}

export interface ApiParams {
  method: ApiMethod;
  path?: string;
  body?: string;
}

export enum ApiMethod {
  Get = 'GET',
  Post = 'POST',
}
