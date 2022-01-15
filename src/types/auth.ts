import { User } from '@/types/user';

export interface AuthenticatedResponse {
  user: User;
  token: string;
  refresh_token: string;
}
