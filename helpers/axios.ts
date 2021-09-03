import { setToken, getRefreshToken } from '@/helpers/auth';
import IAuthenticatedResponse from '@/interfaces/IAuthenticatedResponse';
import { getAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { unstable_batchedUpdates } from 'react-dom';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const logout = () => {
  unstable_batchedUpdates(() => {
    getAuthStore().getState().logout();
  });
};

instance.interceptors.response.use(undefined, async error => {
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
    const { data } = await instance.post<IAuthenticatedResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    setToken(data.token);
    config.headers['Authorization'] = `Bearer ${data.token}`;
    return instance.request(config);
  } catch (error) {
    logout();
    return Promise.reject('Logged out');
  }
});

export default instance;
