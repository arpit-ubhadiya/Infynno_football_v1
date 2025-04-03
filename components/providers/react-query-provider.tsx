'use client'

import { QueryClient, QueryClientProvider, ReactQueryDevtools } from '@/lib/npm';
import keys from '@/config/keys';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,  // Data is considered fresh for 5 minutes
      gcTime: 600000,  // Keep cached data for 10 minutes
      refetchOnWindowFocus: true,
    },
  },
});

export default function ReactQueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {keys.app.envType === 'local_value' ? <ReactQueryDevtools initialIsOpen={false} position='right' buttonPosition='bottom-right' /> : null}
    </QueryClientProvider>
  )
}