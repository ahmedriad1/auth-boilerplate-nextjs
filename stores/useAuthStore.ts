import create from 'zustand';
import { setToken, setRefreshToken } from '@/helpers/auth';
import IUser from '@/interfaces/IUser';

interface IAuthStore {
  isLoggedIn: boolean;
  user: null | IUser;
  login: (data: { user: IUser; token: string; refreshToken?: string }) => any;
  updateUser: (user: IUser) => any;
  logout: () => any;
}

const useAuthStore = create<IAuthStore>(set => ({
  isLoggedIn: false,
  user: null,
  login: ({ user, token, refreshToken }) =>
    set(_state => {
      if (refreshToken) setRefreshToken(refreshToken);
      setToken(token);
      return { isLoggedIn: true, user };
    }),
  updateUser: user => set(_state => ({ user })),
  logout: () =>
    set(_state => {
      setRefreshToken(null);
      setToken(null);
      return { isLoggedIn: false, user: null };
    }),
}));

export default useAuthStore;
