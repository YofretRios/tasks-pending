import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { queryClient } from '../queryClient';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
