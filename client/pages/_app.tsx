import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';

import { initLocalStorage } from "src/service/api";
const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  React.useEffect(() => {
    if (typeof window != undefined) {
      initLocalStorage()
    }
  }, [])
  return <>
    <QueryClientProvider client={queryClient} >
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </QueryClientProvider>
  </>
}
