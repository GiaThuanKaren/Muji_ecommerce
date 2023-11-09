import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import AuthProvider from 'src/Context/AuthProvider';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={300} />
      </AuthProvider>
    </QueryClientProvider >
  </>
}
