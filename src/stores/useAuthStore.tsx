import { useLayoutEffect } from 'react';
import createContext from 'zustand/context';
import { isBrowser } from '@/helpers/functions';
import create from 'zustand';
import { setToken, setRefreshToken } from '@/helpers/auth';
import type { UseContextStore } from 'zustand/context';
import type { UseBoundStore } from 'zustand';
import type { User } from '@/types';

interface IAuthStore {
  isLoggedIn: boolean;
  user: null | User;
  login: (data: { user: User; token: string; refreshToken?: string }) => any;
  updateUser: (user: User) => any;
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

export function useCreateAuthStore(initialState): () => UseBoundStore<IAuthStore> {
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

export const getAuthStore: () => UseBoundStore<IAuthStore> = () => store;
