import { QueryClient } from 'react-query';

/**
 * Global client configration, it will affect all `useQuery` and will only be overriden
 * on per-query level configuration
 * @type {Object}
 */
const defaultOptions = {
  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 180000 // 3 minutes to stale time
  },
};

export const queryClient = new QueryClient({ defaultOptions });
