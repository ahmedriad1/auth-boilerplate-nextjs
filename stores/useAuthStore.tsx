import { useLayoutEffect } from 'react';
import createContext, { UseContextStore } from 'zustand/context';
import { isBrowser } from '@/helpers/functions';
import create, { UseStore } from 'zustand';
import { setToken, setRefreshToken } from '@/helpers/auth';
import IUser from '@/interfaces/IUser';

interface IAuthStore {
  isLoggedIn: boolean;
  user: null | IUser;
  login: (data: { user: IUser; token: string; refreshToken?: string }) => any;
  updateUser: (user: IUser) => any;
  logout: () => any;
}

let store;

const initialState = {
  isLoggedIn: false,
  user: null,
};

const AuthStoreContext = createContext<IAuthStore>();
export const AuthStoreProvider = AuthStoreContext.Provider;

const useAuthStore: UseContextStore<IAuthStore> = AuthStoreContext.useStore;
export default useAuthStore;

export const initializeAuthStore = (preloadedState = {}) => {
  return create<IAuthStore>(set => ({
    ...initialState,
    ...preloadedState,
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
};

export function useCreateAuthStore(initialState): () => UseStore<IAuthStore> {
  if (!isBrowser()) return () => initializeAuthStore(initialState);

  store = store ?? initializeAuthStore(initialState);
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}

export const getAuthStore: () => UseStore<IAuthStore> = () => store;
