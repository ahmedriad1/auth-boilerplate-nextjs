import { AuthStatus } from '@/stores/useAuthStore';
import withConditionalRedirect from './withConditionalRedirect';

export default function withGuest(WrappedComponent, location = '/') {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    redirectCondition: ({ status }) => status === AuthStatus.AUTHENTICATED,
  });
}
