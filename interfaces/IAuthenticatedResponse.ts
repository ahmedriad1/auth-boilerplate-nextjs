import IUser from '@/interfaces/IUser';

export default interface IAuthenticatedResponse {
  user: IUser;
  token: string;
  refresh_token: string;
}
