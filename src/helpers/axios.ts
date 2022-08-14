import { setToken, getRefreshToken } from '@/helpers/auth';
import axios, { AxiosError } from 'axios';
import type { AuthenticatedResponse } from '@/types';
import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { getAuthStore } from '@/stores/useAuthStore';
import toast from './toast';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const logout = () => {
  unstable_batchedUpdates(() => {
    getAuthStore().getState().logout();
  });
};

request.interceptors.response.use(undefined, async error => {
  const {
    response: { status },
    config,
  } = error;

  if (status !== 401 || !config) return Promise.reject(error);

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    logout();
    return Promise.reject(error);
  }

  try {
    const { data } = await request.post<AuthenticatedResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    setToken(data.token);
    config.headers['Authorization'] = `Bearer ${data.token}`;
    return request.request(config);
  } catch (error) {
    logout();
    return Promise.reject('Logged out');
  }
});

export default request;

export const useRequest = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await request.get<T>(url);
        setData(data);
      } catch (error) {
        setError(error as AxiosError<any>);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

type MutationMethod = 'post' | 'put' | 'patch' | 'delete';

interface UseMutationProps<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  method?: MutationMethod;
}

export const useMutation = <T>(
  url: string,
  { onSuccess, onError, method = 'post' }: UseMutationProps<T> = {},
): [
  (body: any) => Promise<void>,
  { data: T | null; loading: boolean; error: AxiosError | null },
] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>(null);

  return [
    async (body: any) => {
      setLoading(true);
      try {
        const { data } = await request[method]<T>(url, body);
        setData(data);
        if (onSuccess) onSuccess(data);
      } catch (error) {
        setError(error as AxiosError<any>);
        const message = error?.response?.data?.message;
        if (message) toast.error(message);
        if (onError) onError(error);
      } finally {
        setLoading(false);
      }
    },
    { data, loading, error },
  ];
};
