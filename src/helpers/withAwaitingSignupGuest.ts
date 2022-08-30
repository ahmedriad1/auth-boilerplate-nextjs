import { AuthStatus } from '@/stores/useAuthStore';
import withConditionalRedirect from './withConditionalRedirect';

export default function withAwaitingSignupGuest(WrappedComponent, location = '/') {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    redirectCondition: ({ status, email }) =>
      status !== AuthStatus.AWAITING_SIGNUP || !email,
  });
}
