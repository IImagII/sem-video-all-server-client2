import type { AppProps } from 'next/app'
import NextProgressBar from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import ReduxToastredLib from 'react-redux-toastr'
import { PersistGate } from 'redux-persist/integration/react'

import '../app/styles/globals.scss'

import AuthProvider from '@/app/providers/AuthProvider'
import { TypeComponentAuthFields } from '@/app/providers/private-route.interface'
import { persistor, store } from '@/app/store/store'

type TypeAppProps = AppProps & TypeComponentAuthFields

const queryClient = new QueryClient() //это нужно для подключения rect-query

//тут делаются все обороты
export default function MyApp({ Component, pageProps }: TypeAppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* nextjs-progressbar - это сторонняя библиотека, которая предоставляет 
      простой и легковесный способ добавления прогресс-бара на страницы вашего 
      приложения Next.js. */}
        <NextProgressBar
          color="#ff7652"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            {/* обернули в наш созданный провайдер AuthProvider важно чтобы он был после redux*/}
            <AuthProvider Component={Component}>
              <Component {...pageProps} />
              {/* библиотека уведомлений */}
              <ReduxToastredLib
                newestOnTop={false}
                preventDuplicates
                progressBar
                closeOnToastrClick
                timeOut={4000}
                transitionIn="fadeIn"
                transitionOut="fadeOut"
              />
            </AuthProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  )
}
