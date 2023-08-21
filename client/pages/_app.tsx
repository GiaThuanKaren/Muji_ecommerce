import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <>
    <QueryClientProvider client={queryClient} >
      <SessionProvider session={session}>

        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  </>
}
