import { QueryClient } from 'react-query';

const defaultOptions = {
  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions });
