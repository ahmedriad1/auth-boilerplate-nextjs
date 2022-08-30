import { useLayoutEffect } from 'react';
import createContext from 'zustand/context';
import { isBrowser } from '@/helpers/functions';
import create, { StoreApi } from 'zustand';
import type { UseBoundStore } from 'zustand';
import type { User } from '@/types';

export enum AuthStatus {
  NOT_AUTHENTICATED,
  AUTHENTICATED,
  AWAITING_SIGNUP,
}

export interface IAuthState {
  status: AuthStatus;
  email: null | string;
  user: null | User;
  login: (data: { user: User }) => any;
  updateUser: (user: User) => any;
  sendEmail: (data: { email: string }) => void;
  logout: () => any;
}

type IAuthStore = UseBoundStore<StoreApi<IAuthState>>;

let store: IAuthStore;

const initialState = {
  status: AuthStatus.NOT_AUTHENTICATED,
  user: null,
  email: null,
};

const AuthStoreContext = createContext<IAuthStore>();
export const AuthStoreProvider = AuthStoreContext.Provider;

const useAuthStore: typeof AuthStoreContext.useStore = AuthStoreContext.useStore;
export default useAuthStore;

export const initializeAuthStore = (preloadedState = {}) => {
  return create<IAuthState>(set => ({
    ...initialState,
    ...preloadedState,
    login: ({ user }) =>
      set(_state => {
        return { status: AuthStatus.AUTHENTICATED, user };
      }),
    updateUser: user => set(_state => ({ user })),
    logout: () => set(_state => ({ status: AuthStatus.NOT_AUTHENTICATED, user: null })),
    sendEmail: ({ email }) =>
      set(_state => ({ status: AuthStatus.AWAITING_SIGNUP, email })),
  }));
};

export function useCreateAuthStore(initialState): () => IAuthStore {
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

export const getAuthStore: () => IAuthStore = () => store;
