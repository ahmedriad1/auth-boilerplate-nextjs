import useAuthStore from '@/stores/useAuthStore';
import { REFRESH_TOKEN_NAME } from './auth';
import withConditionalRedirect from './withConditionalRedirect';

export default function withGuest(WrappedComponent, location = '/') {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: () => {
      const isLoggedIn = useAuthStore(state => state.isLoggedIn);
      return isLoggedIn;
    },
    serverCondition: ctx => !!ctx.req?.cookies[REFRESH_TOKEN_NAME],
  });
}
