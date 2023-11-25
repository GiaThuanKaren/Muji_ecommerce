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
import { store } from "src/store/app";
import { Provider } from 'react-redux'
import { FetchDataFromStorageByKey, initLocalStorage } from "src/service/api";
import { firstLoadFromLocal } from "src/store/app/slices/cartSlices";
import { _addUserToStore } from "src/store/app/slices/authSlices";
const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  React.useEffect(() => {
    if (typeof window != undefined) {
      initLocalStorage()
      let userRef = localStorage.getItem("user")
      if (userRef) {
        store.dispatch(_addUserToStore(JSON.parse(userRef)))

      }
      store.dispatch(firstLoadFromLocal(FetchDataFromStorageByKey()))
    }
  }, [])
  return <>
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ToastContainer autoClose={100} />
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  </>
}
