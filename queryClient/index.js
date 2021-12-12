import { QueryClient } from 'react-query';
import toast from 'react-hot-toast';

function errorHandler(error) {
  const title = error instanceof Error ? error.message : 'Error connecting to server';

  toast.error(title);
}

/**
 * Global client configration, it will affect all `useQuery` and will only be overriden
 * on per-query level configuration
 * @type {Object}
 */
const defaultOptions = {
  queries: {
    onError: errorHandler,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 180000, // 3 minutes to stale time
  },
  mutation: {
    onError: errorHandler,
  },
};

export const queryClient = new QueryClient({ defaultOptions });
