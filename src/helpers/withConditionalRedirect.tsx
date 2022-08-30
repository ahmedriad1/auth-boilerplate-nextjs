import useAuthStore, { IAuthState } from '@/stores/useAuthStore';
import { useRouter } from 'next/router';
import { isBrowser } from './functions';

export default function withConditionalRedirect({
  WrappedComponent,
  redirectCondition: redirectConditionFn,
  location,
}: {
  WrappedComponent: any;
  redirectCondition: (auth: IAuthState) => boolean;
  location: string;
}) {
  const WithConditionalRedirectWrapper = props => {
    const router = useRouter();
    const auth = useAuthStore();
    const redirectCondition = redirectConditionFn(auth);
    if (isBrowser() && redirectCondition) {
      router.push(location);
      return null;
    }
    return <WrappedComponent {...props} />;
  };

  return WithConditionalRedirectWrapper;
}
