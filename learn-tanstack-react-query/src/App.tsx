import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 캐싱 관리 객체
const queryClient = new QueryClient();
// console.log(queryClient);

function App() {
  return (
    // 쿼리 클라이언트 프로바이더로
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
