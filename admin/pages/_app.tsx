import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <QueryClientProvider client={queryClient} >
      <Component {...pageProps} />
      <ToastContainer autoClose={300} />
    </QueryClientProvider >
  </>
}
