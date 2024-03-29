import { AuthStatus } from '@/stores/useAuthStore';
import withConditionalRedirect from './withConditionalRedirect';

export default function withAuth(WrappedComponent, location = '/login') {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    redirectCondition: ({ status }) => status !== AuthStatus.AUTHENTICATED,
  });
}
