export type { AuthenticatedResponse } from './auth';
export type { User } from './user';

export type ApiError = {
  statusCode: number;
  message: string;
  error: 'string';
};

export type AuthError =
  | ApiError
  | (ApiError & {
      awaitingSignup: boolean;
      email: string;
    });
