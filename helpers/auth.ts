import cookie from 'js-cookie';
import axios from './axios';

export const REFRESH_TOKEN_NAME = 'next_auth_boilerplate.refresh_token';

const setToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getRefreshToken = () => cookie.get(REFRESH_TOKEN_NAME);

const setRefreshToken = refreshToken => {
  if (!refreshToken) return cookie.remove(REFRESH_TOKEN_NAME);
  cookie.set(REFRESH_TOKEN_NAME, refreshToken);
};

export { setToken, getRefreshToken, setRefreshToken };
